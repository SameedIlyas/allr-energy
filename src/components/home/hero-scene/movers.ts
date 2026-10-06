import * as THREE from 'three';
import { PAD } from './campus';
import type { Materials } from './materials';

/** Animated part of the scene: ring road + trucks, wind turbines, energy pulses. */

export interface Animated {
  object: THREE.Object3D;
  update: (elapsed: number) => void;
}

// Ring road just outside the pad.
const ROAD = { halfW: PAD.w / 2 + 7, halfD: PAD.d / 2 + 7, width: 6 } as const;
const PERIMETER = 4 * ROAD.halfW + 4 * ROAD.halfD;

/** Position + heading along the rectangular ring road for a distance travelled. */
function pointOnRing(distance: number, laneOffset: number): { x: number; z: number; heading: number } {
  const w = ROAD.halfW * 2;
  const d = ROAD.halfD * 2;
  let s = ((distance % PERIMETER) + PERIMETER) % PERIMETER;
  const hw = ROAD.halfW + laneOffset;
  const hd = ROAD.halfD + laneOffset;
  if (s < w) return { x: -ROAD.halfW + s, z: hd, heading: 0 };
  s -= w;
  if (s < d) return { x: hw, z: ROAD.halfD - s, heading: Math.PI / 2 };
  s -= d;
  if (s < w) return { x: ROAD.halfW - s, z: -hd, heading: Math.PI };
  s -= w;
  return { x: -hw, z: -ROAD.halfD + s, heading: -Math.PI / 2 };
}

function buildRoad(mats: Materials): THREE.Group {
  const group = new THREE.Group();
  const { halfW, halfD, width } = ROAD;
  const strips: [number, number, number, number][] = [
    [halfW * 2 + width, width, 0, halfD],
    [halfW * 2 + width, width, 0, -halfD],
    [width, halfD * 2, halfW, 0],
    [width, halfD * 2, -halfW, 0],
  ];
  for (const [w, d, x, z] of strips) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(w, d), mats.road);
    strip.rotation.x = -Math.PI / 2;
    strip.position.set(x, 0.06, z);
    strip.receiveShadow = true;
    group.add(strip);
  }

  const dashGeo = new THREE.PlaneGeometry(2.2, 0.25);
  const dashes: THREE.Matrix4[] = [];
  const flat = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));
  for (let s = 0; s < PERIMETER; s += 5) {
    const p = pointOnRing(s, 0);
    const q = flat.clone().premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), p.heading));
    dashes.push(new THREE.Matrix4().compose(new THREE.Vector3(p.x, 0.08, p.z), q, new THREE.Vector3(1, 1, 1)));
  }
  const dashMesh = new THREE.InstancedMesh(dashGeo, mats.roadLine, dashes.length);
  dashes.forEach((m, i) => dashMesh.setMatrixAt(i, m));
  group.add(dashMesh);
  return group;
}

function buildTruck(mats: Materials): THREE.Group {
  const truck = new THREE.Group();
  const trailer = new THREE.Mesh(new THREE.BoxGeometry(7, 2.6, 2.3), mats.wall);
  trailer.position.set(-1.2, 1.7, 0);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2, 2.3, 2.3), mats.truckCab);
  cab.position.set(3.4, 1.55, 0);
  trailer.castShadow = cab.castShadow = true;
  truck.add(trailer, cab);
  return truck;
}

function trucks(mats: Materials): Animated[] {
  const specs = [
    { start: 0, speed: 9, lane: 1.4 },
    { start: PERIMETER * 0.3, speed: 9, lane: 1.4 },
    { start: PERIMETER * 0.62, speed: -8, lane: -1.4 },
    { start: PERIMETER * 0.85, speed: -8, lane: -1.4 },
  ];
  return specs.map(({ start, speed, lane }) => {
    const truck = buildTruck(mats);
    return {
      object: truck,
      update: (t) => {
        const p = pointOnRing(start + speed * t, lane);
        truck.position.set(p.x, 0, p.z);
        truck.rotation.y = p.heading + (speed < 0 ? Math.PI : 0);
      },
    };
  });
}

const TURBINE_HEIGHT = 30;
const TURBINE_SPOTS: readonly [number, number, number][] = [
  // x, z, rotor speed (rad/s)
  [-95, -95, 0.9],
  [-50, -110, 1.15],
  [-2, -100, 1.0],
  [48, -112, 1.25],
  [96, -92, 0.95],
];

function turbine(mats: Materials, x: number, z: number, speed: number): Animated & { hub: THREE.Vector3 } {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 1, TURBINE_HEIGHT, 16), mats.turbine);
  tower.position.y = TURBINE_HEIGHT / 2;
  tower.castShadow = true;
  const nacelle = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 3.6), mats.turbine);
  nacelle.position.set(0, TURBINE_HEIGHT + 0.6, 0.6);

  const rotor = new THREE.Group();
  rotor.position.set(0, TURBINE_HEIGHT + 0.6, 2.6);
  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.75, 16, 12), mats.turbine);
  rotor.add(hub);
  const bladeGeo = new THREE.BoxGeometry(0.7, 15, 0.22);
  bladeGeo.translate(0, 7.5, 0);
  for (let i = 0; i < 3; i++) {
    const blade = new THREE.Mesh(bladeGeo, mats.turbine);
    blade.rotation.z = (i * Math.PI * 2) / 3;
    blade.castShadow = true;
    rotor.add(blade);
  }
  group.add(tower, nacelle, rotor);

  const offset = x * 0.01;
  return {
    object: group,
    hub: new THREE.Vector3(x, TURBINE_HEIGHT + 0.6, z + 2.6),
    update: (t) => {
      rotor.rotation.z = -(t * speed + offset);
    },
  };
}

/** Glowing pulses travelling from each turbine to the main hall's roof. */
function energyFlows(mats: Materials, hubs: THREE.Vector3[]): Animated[] {
  const targets = [new THREE.Vector3(-8, 9, 6), new THREE.Vector3(35, 14, 2)];
  const pulseGeo = new THREE.SphereGeometry(0.55, 12, 10);
  const lineMat = new THREE.LineBasicMaterial({ color: 0xcde1f5, transparent: true, opacity: 0.22 });

  return hubs.map((hub, i) => {
    const target = targets[i % targets.length];
    const mid = hub.clone().lerp(target, 0.5);
    mid.y += 22;
    const curve = new THREE.QuadraticBezierCurve3(hub, mid, target);
    const group = new THREE.Group();
    group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)), lineMat));

    const pulses = [0, 0.5].map(() => {
      const pulse = new THREE.Mesh(pulseGeo, mats.pulse);
      group.add(pulse);
      return pulse;
    });

    return {
      object: group,
      update: (t) => {
        pulses.forEach((pulse, k) => {
          const u = (t * 0.22 + i * 0.17 + k * 0.5) % 1;
          pulse.position.copy(curve.getPoint(u));
          const s = 0.6 + Math.sin(u * Math.PI) * 0.7;
          pulse.scale.setScalar(s);
        });
      },
    };
  });
}

export function buildMovers(mats: Materials): Animated[] {
  const road: Animated = { object: buildRoad(mats), update: () => {} };
  const turbines = TURBINE_SPOTS.map(([x, z, speed]) => turbine(mats, x, z, speed));
  return [road, ...trucks(mats), ...turbines, ...energyFlows(mats, turbines.map((t) => t.hub))];
}

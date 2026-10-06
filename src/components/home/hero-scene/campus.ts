import * as THREE from 'three';
import { CONTAINER_COLORS, seededRandom, type Materials } from './materials';

/** Static part of the scene: ground, halls with solar roofs, tower, silos, containers, trees. */

export const PAD = { w: 140, d: 92 } as const;

interface HallSpec {
  w: number;
  d: number;
  h: number;
  x: number;
  z: number;
  /** Which long side gets loading docks. */
  docks?: 'north' | 'south';
}

const HALLS: readonly HallSpec[] = [
  { w: 60, d: 30, h: 8, x: -8, z: 6, docks: 'south' },
  { w: 26, d: 24, h: 13, x: 35, z: 2 },
  { w: 72, d: 12, h: 6, x: -4, z: -26, docks: 'north' },
  { w: 12, d: 10, h: 5, x: 42, z: -27 },
];

function box(w: number, h: number, d: number, mat: THREE.Material): THREE.Mesh {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function instanced(geometry: THREE.BufferGeometry, mat: THREE.Material, matrices: THREE.Matrix4[]) {
  const mesh = new THREE.InstancedMesh(geometry, mat, matrices.length);
  matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
  mesh.instanceMatrix.needsUpdate = true;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addGround(root: THREE.Group, mats: Materials) {
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), mats.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  root.add(ground);

  const grid = new THREE.GridHelper(700, 70, 0x3b5270, 0x2b3e55);
  const gridMat = grid.material as THREE.Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.35;
  grid.position.y = 0.02;
  root.add(grid);

  const pad = new THREE.Mesh(new THREE.PlaneGeometry(PAD.w, PAD.d), mats.pad);
  pad.rotation.x = -Math.PI / 2;
  pad.position.y = 0.05;
  pad.receiveShadow = true;
  root.add(pad);
}

function addHalls(root: THREE.Group, mats: Materials) {
  const panelMatrices: THREE.Matrix4[] = [];
  const dockMatrices: THREE.Matrix4[] = [];
  const tilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.28, 0, 0));
  const one = new THREE.Vector3(1, 1, 1);

  for (const hall of HALLS) {
    const body = box(hall.w, hall.h, hall.d, mats.wall);
    body.position.set(hall.x, hall.h / 2, hall.z);
    root.add(body);

    const roof = box(hall.w + 0.6, 0.5, hall.d + 0.6, mats.roof);
    roof.position.set(hall.x, hall.h + 0.25, hall.z);
    root.add(roof);

    const band = box(hall.w * 0.86, 0.55, 0.08, mats.window);
    band.castShadow = false;
    band.position.set(hall.x, hall.h * 0.72, hall.z + hall.d / 2 + 0.05);
    root.add(band);

    // Solar panel rows across the roof.
    const cols = Math.floor((hall.w - 2.5) / 1.95);
    const rows = Math.floor((hall.d - 2.5) / 2.3);
    const x0 = hall.x - ((cols - 1) * 1.95) / 2;
    const z0 = hall.z - ((rows - 1) * 2.3) / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const pos = new THREE.Vector3(x0 + c * 1.95, hall.h + 0.85, z0 + r * 2.3);
        panelMatrices.push(new THREE.Matrix4().compose(pos, tilt, one));
      }
    }

    if (hall.docks) {
      const side = hall.docks === 'south' ? 1 : -1;
      const count = Math.floor((hall.w - 6) / 3.6);
      const start = hall.x - ((count - 1) * 3.6) / 2;
      for (let i = 0; i < count; i++) {
        const pos = new THREE.Vector3(start + i * 3.6, 1.4, hall.z + side * (hall.d / 2 + 0.06));
        dockMatrices.push(new THREE.Matrix4().compose(pos, new THREE.Quaternion(), one));
      }
    }
  }

  root.add(instanced(new THREE.BoxGeometry(1.75, 0.08, 1.2), mats.panel, panelMatrices));
  root.add(instanced(new THREE.BoxGeometry(2.4, 2.8, 0.12), mats.dock, dockMatrices));
}

function addTowerAndSilos(root: THREE.Group, mats: Materials) {
  const tower = box(13, 22, 11, mats.tower);
  tower.position.set(-50, 11, 28);
  root.add(tower);
  const cap = box(13.6, 0.6, 11.6, mats.roof);
  cap.position.set(-50, 22.3, 28);
  root.add(cap);

  const siloGeo = new THREE.CylinderGeometry(2.3, 2.3, 13, 24);
  const siloTop = new THREE.ConeGeometry(2.4, 1.8, 24);
  [
    [56, 18],
    [56, 24],
    [62, 21],
  ].forEach(([x, z]) => {
    const silo = new THREE.Mesh(siloGeo, mats.wall);
    silo.position.set(x, 6.5, z);
    silo.castShadow = silo.receiveShadow = true;
    const top = new THREE.Mesh(siloTop, mats.roof);
    top.position.set(x, 13.9, z);
    top.castShadow = true;
    root.add(silo, top);
  });
}

function addContainers(root: THREE.Group, mats: Materials) {
  const geo = new THREE.BoxGeometry(5, 2.2, 2.2);
  const rand = seededRandom(7);
  const matrices: THREE.Matrix4[] = [];
  const colors: number[] = [];
  for (let row = 0; row < 3; row++) {
    for (let i = 0; i < 9; i++) {
      if (rand() < 0.18) continue;
      const stack = rand() < 0.3 ? 2 : 1;
      for (let s = 0; s < stack; s++) {
        const pos = new THREE.Vector3(-34 + i * 5.6, 1.15 + s * 2.25, 30 + row * 3.1);
        matrices.push(new THREE.Matrix4().makeTranslation(pos.x, pos.y, pos.z));
        colors.push(CONTAINER_COLORS[Math.floor(rand() * CONTAINER_COLORS.length)]);
      }
    }
  }
  const mesh = instanced(geo, mats.container, matrices);
  const color = new THREE.Color();
  colors.forEach((c, i) => mesh.setColorAt(i, color.setHex(c)));
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  root.add(mesh);
}

function addTrees(root: THREE.Group, mats: Materials) {
  const rand = seededRandom(42);
  const matrices: THREE.Matrix4[] = [];
  const q = new THREE.Quaternion();
  while (matrices.length < 140) {
    const x = (rand() - 0.5) * 300;
    const z = (rand() - 0.5) * 220;
    // Keep the pad and ring road clear.
    if (Math.abs(x) < PAD.w / 2 + 14 && Math.abs(z) < PAD.d / 2 + 14) continue;
    const s = 0.7 + rand() * 0.9;
    matrices.push(new THREE.Matrix4().compose(new THREE.Vector3(x, 3 * s, z), q, new THREE.Vector3(s, s, s)));
  }
  const trees = instanced(new THREE.ConeGeometry(2.2, 6, 7), mats.tree, matrices);
  trees.receiveShadow = false;
  root.add(trees);
}

export function buildCampus(mats: Materials): THREE.Group {
  const root = new THREE.Group();
  addGround(root, mats);
  addHalls(root, mats);
  addTowerAndSilos(root, mats);
  addContainers(root, mats);
  addTrees(root, mats);
  return root;
}

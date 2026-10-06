import * as THREE from 'three';

export const PALETTE = {
  sky: 0x1b2735,
  ground: 0x223142,
  grid: 0x3b5270,
  gridSub: 0x2b3e55,
  pad: 0xa9b8cf,
  wall: 0xe9eef6,
  roof: 0xc1ccdb,
  panel: 0x24487e,
  dock: 0x2a3a55,
  window: 0xcde1f5,
  road: 0x18222e,
  roadLine: 0xa7b8cc,
  turbine: 0xeef3fa,
  tree: 0x2f4a50,
  truckCab: 0x0b57d6,
  pulse: 0xcde1f5,
} as const;

export const CONTAINER_COLORS = [0x8f4a4a, 0x0b57d6, 0xa8925a, 0x4f7466, 0xe9eef6, 0x2b3e55] as const;

export type Materials = ReturnType<typeof createMaterials>;

export function createMaterials() {
  return {
    ground: new THREE.MeshStandardMaterial({ color: PALETTE.ground, roughness: 1 }),
    pad: new THREE.MeshStandardMaterial({ color: PALETTE.pad, roughness: 0.95 }),
    wall: new THREE.MeshStandardMaterial({ color: PALETTE.wall, roughness: 0.75 }),
    roof: new THREE.MeshStandardMaterial({ color: PALETTE.roof, roughness: 0.85 }),
    panel: new THREE.MeshStandardMaterial({
      color: PALETTE.panel,
      metalness: 0.55,
      roughness: 0.28,
      emissive: 0x1b2735,
      emissiveIntensity: 0.45,
    }),
    dock: new THREE.MeshStandardMaterial({ color: PALETTE.dock, roughness: 0.6 }),
    window: new THREE.MeshStandardMaterial({
      color: PALETTE.window,
      emissive: 0x9fbcdc,
      emissiveIntensity: 1.1,
      roughness: 0.3,
    }),
    road: new THREE.MeshStandardMaterial({ color: PALETTE.road, roughness: 0.9 }),
    roadLine: new THREE.MeshBasicMaterial({ color: PALETTE.roadLine }),
    turbine: new THREE.MeshStandardMaterial({ color: PALETTE.turbine, roughness: 0.45, metalness: 0.1 }),
    tree: new THREE.MeshStandardMaterial({ color: PALETTE.tree, roughness: 0.9, flatShading: true }),
    truckCab: new THREE.MeshStandardMaterial({ color: PALETTE.truckCab, roughness: 0.4, metalness: 0.2 }),
    container: new THREE.MeshStandardMaterial({ roughness: 0.6, metalness: 0.15 }),
    pulse: new THREE.MeshBasicMaterial({
      color: PALETTE.pulse,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
    tower: createTowerMaterial(),
  };
}

/** Office tower facade: a procedurally drawn grid of lit / unlit windows. */
function createTowerMaterial(): THREE.MeshStandardMaterial {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#1b2735';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const cols = 6;
    const rows = 16;
    const cw = canvas.width / cols;
    const rh = canvas.height / rows;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Deterministic pattern so every visit looks the same.
        const lit = (r * 7 + c * 13) % 5 < 3;
        ctx.fillStyle = lit ? '#cde1f5' : '#2b3e55';
        ctx.fillRect(c * cw + 3, r * rh + 3, cw - 6, rh - 6);
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: texture,
    emissiveMap: texture,
    emissive: 0xffffff,
    emissiveIntensity: 0.55,
    roughness: 0.25,
    metalness: 0.4,
  });
}

/** Small deterministic PRNG so layouts are identical between renders. */
export function seededRandom(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

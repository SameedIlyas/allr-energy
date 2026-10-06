'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { buildCampus } from './campus';
import { createMaterials, PALETTE } from './materials';
import { buildMovers } from './movers';

const ORBIT_RADIUS = 235;
const ORBIT_HEIGHT = 118;
const ORBIT_SPEED = 0.035; // rad/s
const START_ANGLE = 0.55;
const LOOK_AT = new THREE.Vector3(0, 0, -12);

interface HeroCanvasProps {
  /** Called once the first frame is on screen, so the static fallback can fade out. */
  onReady?: () => void;
  onError?: () => void;
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    mesh.geometry?.dispose();
    const material = mesh.material as THREE.Material | THREE.Material[] | undefined;
    const list = Array.isArray(material) ? material : material ? [material] : [];
    list.forEach((m) => {
      (m as THREE.MeshStandardMaterial).map?.dispose();
      m.dispose();
    });
  });
}

export default function HeroCanvas({ onReady, onError }: HeroCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ onReady, onError });
  useEffect(() => {
    callbacks.current = { onReady, onError };
  }, [onReady, onError]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    } catch (err: unknown) {
      console.error('Hero scene: WebGL unavailable, using static fallback', err);
      callbacks.current.onError?.();
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(PALETTE.sky);
    scene.fog = new THREE.Fog(PALETTE.sky, 210, 420);

    scene.add(new THREE.HemisphereLight(0xcfe3ff, 0x1b2735, 1.15));
    const sun = new THREE.DirectionalLight(0xfff2dc, 2.5);
    sun.position.set(70, 95, 45);
    sun.castShadow = true;
    sun.shadow.mapSize.set(small ? 1024 : 2048, small ? 1024 : 2048);
    Object.assign(sun.shadow.camera, { left: -95, right: 95, top: 95, bottom: -95, near: 10, far: 280 });
    sun.shadow.bias = -0.0005;
    sun.shadow.normalBias = 0.02;
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x9fb8d6, 0.9);
    rim.position.set(-90, 45, -70);
    scene.add(rim);

    const mats = createMaterials();
    scene.add(buildCampus(mats));
    const movers = buildMovers(mats);
    movers.forEach((m) => scene.add(m.object));

    const camera = new THREE.PerspectiveCamera(30, 1, 1, 600);
    const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // On wide screens shift the campus right so the headline on the left stays clear.
      if (w / h > 1.25) camera.setViewOffset(w, h, -w * 0.24, -h * 0.04, w, h);
      else camera.clearViewOffset();
      camera.updateProjectionMatrix();
    };

    const renderAt = (t: number) => {
      pointer.sx += (pointer.x - pointer.sx) * 0.04;
      pointer.sy += (pointer.y - pointer.sy) * 0.04;
      const angle = START_ANGLE + (reducedMotion ? 0 : t * ORBIT_SPEED) + pointer.sx * 0.12;
      camera.position.set(
        Math.sin(angle) * ORBIT_RADIUS,
        ORBIT_HEIGHT + pointer.sy * 10,
        Math.cos(angle) * ORBIT_RADIUS,
      );
      camera.lookAt(LOOK_AT);
      movers.forEach((m) => m.update(reducedMotion ? 4 : t));
      renderer.render(scene, camera);
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotion) renderAt(0);
    });
    ro.observe(host);

    // Timer accumulates only time spent running, so the scene resumes where it paused.
    const timer = new THREE.Timer();
    let frame = 0;
    let running = false;
    let readyFired = false;

    const loop = (timestamp: number) => {
      timer.update(timestamp);
      renderAt(timer.getElapsed());
      if (!readyFired) {
        readyFired = true;
        callbacks.current.onReady?.();
      }
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      timer.reset();
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(frame);
    };

    if (reducedMotion) {
      renderAt(0);
      callbacks.current.onReady?.();
    }

    // Pause when scrolled away or the tab is hidden.
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    io.observe(host);
    const onVisibility = () => (document.hidden ? stop() : visible && start());
    document.addEventListener('visibilitychange', onVisibility);

    const onPointer = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointer);
      disposeScene(scene);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} style={{ position: 'absolute', inset: 0 }} />;
}

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function PredictionVisualizer3D({ state }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const N = 700; // slightly fewer particles for compactness and perfect visual density

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.z = 8;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Texture
    const createTexture = () => {
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const ctx = pCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(pCanvas);
    };

    const texture = createTexture();

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.16,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: new THREE.Color('#06b6d4') // Default cyan
    });

    // Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(N * 3);

    // Shape Generators
    const getTorusPoints = () => {
      const points = [];
      const r1 = 1.8;
      const r2 = 0.55;
      for (let i = 0; i < N; i++) {
        const u = (i / N) * Math.PI * 2 * 3; // helical torus winding
        const v = (i / N) * Math.PI * 2 * 20;
        const x = (r1 + r2 * Math.cos(v)) * Math.cos(u);
        const y = (r1 + r2 * Math.cos(v)) * Math.sin(u);
        const z = r2 * Math.sin(v);
        points.push(new THREE.Vector3(x, y, z));
      }
      return points;
    };

    const getHelixPoints = () => {
      const points = [];
      const radius = 1.3;
      const height = 4.0;
      for (let i = 0; i < N; i++) {
        const strand = i % 2 === 0 ? 0 : 1;
        const angle = (i / N) * Math.PI * 10;
        const t = (i / N) - 0.5;
        const x = Math.cos(angle + (strand * Math.PI)) * radius;
        const z = Math.sin(angle + (strand * Math.PI)) * radius;
        const y = t * height;
        points.push(new THREE.Vector3(x, y, z));
      }
      return points;
    };

    const getSpherePoints = () => {
      const points = [];
      const radius = 1.6;
      for (let i = 0; i < N; i++) {
        const k = i + 0.5;
        const phi = Math.acos(1 - 2 * k / N);
        const theta = Math.PI * (1 + Math.sqrt(5)) * k;
        const x = Math.sin(phi) * Math.cos(theta) * radius;
        const y = Math.sin(phi) * Math.sin(theta) * radius;
        const z = Math.cos(phi) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }
      return points;
    };

    const getSpikyPoints = () => {
      const points = [];
      for (let i = 0; i < N; i++) {
        const k = i + 0.5;
        const phi = Math.acos(1 - 2 * k / N);
        const theta = Math.PI * (1 + Math.sqrt(5)) * k;
        const radius = 1.3 + (i % 6 === 0 ? 0.9 : 0.0);
        const x = Math.sin(phi) * Math.cos(theta) * radius;
        const y = Math.sin(phi) * Math.sin(theta) * radius;
        const z = Math.cos(phi) * radius;
        points.push(new THREE.Vector3(x, y, z));
      }
      return points;
    };

    const shapes = {
      idle: getTorusPoints,
      loading: getHelixPoints,
      low: getSpherePoints,
      high: getSpikyPoints
    };

    // Initialize positions randomly dispersed
    const initialTargets = shapes[state] ? shapes[state]() : getTorusPoints();
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      positions[i3] = initialTargets[i].x + (Math.random() - 0.5) * 4;
      positions[i3 + 1] = initialTargets[i].y + (Math.random() - 0.5) * 4;
      positions[i3 + 2] = initialTargets[i].z + (Math.random() - 0.5) * 4;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMesh = new THREE.Points(geometry, material);
    scene.add(pointsMesh);

    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      const time = clock.getElapsedTime();
      const posAttr = geometry.attributes.position;
      const posArr = posAttr.array;
      
      const targets = (shapes[state] ? shapes[state] : shapes.idle)();

      // State-specific behavior
      let targetColor = new THREE.Color('#06b6d4'); // Cyan idle
      let pulseFreq = 2.0;
      let pulseAmp = 0.04;
      let morphEase = 0.06;

      if (state === 'loading') {
        targetColor = new THREE.Color('#f97316'); // Orange loading
        pointsMesh.rotation.y = time * 2.2;
        pointsMesh.rotation.x = time * 0.5;
        pulseFreq = 6.0;
        pulseAmp = 0.08;
      } else if (state === 'low') {
        targetColor = new THREE.Color('#10b981'); // Emerald green low risk
        pointsMesh.rotation.y = time * 0.12;
        pointsMesh.rotation.z = time * 0.05;
        pulseFreq = 1.8;
        pulseAmp = 0.06;
      } else if (state === 'high') {
        targetColor = new THREE.Color('#ef4444'); // Crimson red high risk
        pointsMesh.rotation.y = time * 0.4;
        pointsMesh.rotation.x = time * 0.8;
        pulseFreq = 14.0; // Fast alarm heartbeat
        pulseAmp = 0.12;
        morphEase = 0.12; // Snap quick
      } else {
        // Idle
        pointsMesh.rotation.y = time * 0.25;
        pointsMesh.rotation.z = time * 0.08;
      }

      // Smooth color transition
      material.color.lerp(targetColor, 0.06);

      // Pulse breathing scale
      const scaleVal = 1 + Math.sin(time * pulseFreq) * pulseAmp;
      pointsMesh.scale.setScalar(scaleVal);

      // Morph coordinates
      for (let i = 0; i < N; i++) {
        const i3 = i * 3;
        const target = targets[i];

        posArr[i3] += (target.x - posArr[i3]) * morphEase;
        posArr[i3 + 1] += (target.y - posArr[i3 + 1]) * morphEase;
        posArr[i3 + 2] += (target.z - posArr[i3 + 2]) * morphEase;

        // Add small vibration if loading or high risk
        if (state === 'loading' || state === 'high') {
          const jitter = state === 'high' ? 0.015 : 0.005;
          posArr[i3] += (Math.random() - 0.5) * jitter;
          posArr[i3 + 1] += (Math.random() - 0.5) * jitter;
          posArr[i3 + 2] += (Math.random() - 0.5) * jitter;
        }
      }

      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler
    const resizeObserver = new ResizeObserver(() => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      texture.dispose();
    };
  }, [state]);

  return (
    <div ref={containerRef} className="relative w-full h-[180px] sm:h-[220px] bg-slate-950/90 rounded-2xl border border-slate-800 shadow-inner overflow-hidden my-4 flex items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_60%,rgba(0,0,0,0.85))] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(20,184,166,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );
}

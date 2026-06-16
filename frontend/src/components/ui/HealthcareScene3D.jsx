import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HealthcareScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || 600;
    const H = mount.clientHeight || 400;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const pLight = new THREE.PointLight(0x38bdf8, 4, 20);
    pLight.position.set(4, 4, 4);
    scene.add(pLight);
    const pLight2 = new THREE.PointLight(0x0ea5e9, 3, 16);
    pLight2.position.set(-4, -2, 2);
    scene.add(pLight2);
    const pLight3 = new THREE.PointLight(0x22d3ee, 2, 12);
    pLight3.position.set(0, 3, -2);
    scene.add(pLight3);

    /* ── DNA Helix ── */
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const matS1  = new THREE.MeshPhongMaterial({ color: 0x0ea5e9, shininess: 120 });
    const matS2  = new THREE.MeshPhongMaterial({ color: 0x22d3ee, shininess: 120 });
    const matRng = new THREE.MeshPhongMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55, shininess: 60 });
    const bGeo   = new THREE.SphereGeometry(0.09, 16, 16);

    const HELIX_POINTS = 44;
    const RADIUS       = 0.9;
    const HEIGHT       = 4.5;
    const TURNS        = 2.2;

    for (let i = 0; i < HELIX_POINTS; i++) {
      const t     = i / HELIX_POINTS;
      const angle = t * Math.PI * 2 * TURNS;
      const y     = (t - 0.5) * HEIGHT;

      /* Strand 1 */
      const s1 = new THREE.Mesh(bGeo, matS1);
      s1.position.set(RADIUS * Math.cos(angle), y, RADIUS * Math.sin(angle));
      dnaGroup.add(s1);

      /* Strand 2 */
      const s2 = new THREE.Mesh(bGeo, matS2);
      s2.position.set(RADIUS * Math.cos(angle + Math.PI), y, RADIUS * Math.sin(angle + Math.PI));
      dnaGroup.add(s2);

      /* Connecting rungs */
      if (i % 5 === 0) {
        const cx = (s1.position.x + s2.position.x) / 2;
        const cz = (s1.position.z + s2.position.z) / 2;
        const dist = s1.position.distanceTo(s2.position);
        const rGeo = new THREE.CylinderGeometry(0.025, 0.025, dist, 8);
        const rung = new THREE.Mesh(rGeo, matRng);
        rung.position.set(cx, y, cz);
        rung.rotation.z = Math.PI / 2;
        rung.rotation.y = Math.atan2(s2.position.z - s1.position.z, s2.position.x - s1.position.x);
        dnaGroup.add(rung);
      }
    }

    /* ── Particle Field ── */
    const PARTICLE_COUNT = 350;
    const pPos   = new Float32Array(PARTICLE_COUNT * 3);
    const pColor = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      /* Spread particles in a large volume */
      pPos[i * 3]     = (Math.random() - 0.5) * 14;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      /* Sky-blue → cyan gradient */
      const t = Math.random();
      pColor[i * 3]     = 0.05 + t * 0.15;
      pColor[i * 3 + 1] = 0.55 + t * 0.30;
      pColor[i * 3 + 2] = 0.90 + t * 0.10;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColor, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045, vertexColors: true,
      transparent: true, opacity: 0.75, sizeAttenuation: true,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ── Central Pulsing Orb ── */
    const orbGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const orbMat = new THREE.MeshPhongMaterial({
      color: 0x0ea5e9, emissive: 0x0284c7, emissiveIntensity: 0.6,
      transparent: true, opacity: 0.88, shininess: 120,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    /* ── Pulse Rings ── */
    const rings = [];
    for (let i = 0; i < 3; i++) {
      const rGeo = new THREE.RingGeometry(0.35 + i * 0.35, 0.38 + i * 0.35, 64);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8, transparent: true,
        opacity: 0.25 - i * 0.06, side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(rGeo, rMat);
      ring.rotation.x = -Math.PI / 4;
      scene.add(ring);
      rings.push({ mesh: ring, phaseOffset: i * 1.3, baseMat: rMat });
    }

    /* ── Floating Mini Spheres ── */
    const floaters = [];
    const floaterColors = [0x38bdf8, 0x22d3ee, 0x0ea5e9, 0x7dd3fc];
    for (let i = 0; i < 6; i++) {
      const fg = new THREE.SphereGeometry(0.06 + Math.random() * 0.08, 16, 16);
      const fm = new THREE.MeshPhongMaterial({
        color: floaterColors[i % floaterColors.length],
        transparent: true, opacity: 0.7, shininess: 80,
      });
      const fs = new THREE.Mesh(fg, fm);
      fs.position.set(
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 2,
      );
      scene.add(fs);
      floaters.push({
        mesh: fs,
        speed: 0.3 + Math.random() * 0.5,
        amplitude: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        baseY: fs.position.y,
      });
    }

    /* ── Mouse Tracking ── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / W - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / H - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Animation Loop ── */
    const startTime = Date.now();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (Date.now() - startTime) / 1000;

      /* Rotate DNA */
      dnaGroup.rotation.y = t * 0.35;
      dnaGroup.rotation.x += (mouseY * 0.25 - dnaGroup.rotation.x) * 0.04;
      dnaGroup.rotation.z += (-mouseX * 0.05 - dnaGroup.rotation.z) * 0.04;

      /* Pulse orb */
      const pulse = 1 + Math.sin(t * 2.8) * 0.22;
      orb.scale.setScalar(pulse);

      /* Pulse rings */
      rings.forEach(({ mesh, phaseOffset, baseMat }) => {
        const s = 1 + Math.sin(t * 2.2 + phaseOffset) * 0.35;
        mesh.scale.setScalar(s);
        baseMat.opacity = Math.max(0, 0.25 * (1 - (s - 1) / 0.4));
      });

      /* Float mini spheres */
      floaters.forEach(({ mesh, speed, amplitude, phase, baseY }) => {
        mesh.position.y = baseY + Math.sin(t * speed + phase) * amplitude;
        mesh.rotation.y = t * 0.5;
      });

      /* Slow particle drift */
      particles.rotation.y = t * 0.015;
      particles.rotation.x = Math.sin(t * 0.08) * 0.06;

      /* Camera parallax */
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.4 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
}

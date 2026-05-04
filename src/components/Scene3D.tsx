"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 1. Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Geometry - Abstract Plane Mesh
    const geometry = new THREE.PlaneGeometry(30, 30, 40, 40);
    
    // Add noise-like distortion to vertices
    const count = geometry.attributes.position.count;
    const originalPositions = new Float32Array(count * 3);
    originalPositions.set(geometry.attributes.position.array);
    
    const material = new THREE.MeshBasicMaterial({
      color: 0x7DD3FC, // accent color
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2.5;
    mesh.position.y = -2;
    scene.add(mesh);

    camera.position.z = 5;

    // 3. Animation Loop
    let frame = 0;
    const animate = () => {
      frame += 0.01;
      
      const positions = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const x = originalPositions[i * 3];
        const y = originalPositions[i * 3 + 1];
        
        // Simple wave animation
        positions[i * 3 + 2] = Math.sin(x * 0.5 + frame) * 0.5 + Math.cos(y * 0.3 + frame) * 0.5;
      }
      
      geometry.attributes.position.needsUpdate = true;
      mesh.rotation.z += 0.001;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // 4. Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[-1] pointer-events-none opacity-50 transition-opacity duration-1000" 
      style={{ background: 'radial-gradient(circle at center, transparent 0%, #0A0A0F 100%)' }}
    />
  );
}

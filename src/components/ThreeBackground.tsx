import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import cloud from '../assets/cloud2.png';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    
    scene.background = new THREE.Color(0x87CEEB);
    
    // Create clouds
    const cloudGeometry = new THREE.PlaneGeometry(500, 500);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(cloud),
      transparent: true,
    });

    const clouds = [];
    for (let i = 0; i < 5; i++) {
      const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloud.position.set(Math.random() * 1000 - 500, Math.random() * 500 - 250, -500);
      clouds.push(cloud);
      scene.add(cloud);
    }

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      clouds.forEach((cloud) => {
        cloud.position.x -= 0.1;
        if (cloud.position.x < -750) {
          cloud.position.x = 750;
        }
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div style={{position:'fixed','left':0}} ref={mountRef} />;
};

export default ThreeBackground;

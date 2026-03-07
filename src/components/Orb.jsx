import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import useActiveSection from "../hooks/useActiveSection";

// Define positions and colors for each section per device
const sectionConfig = {
  hero: { 
    color: '#8b5cf6',
    roughness: 0.1,
    positions: {
      mobile: [1.5, 2.5, 3],   // Centered for mobile
      tablet: [1.5, 2, 4],   // Slightly offset for tablet
      desktop: [2, 2, 5]   // Original desktop position
    }
  },
  about: { 
    color: '#065f46',
    roughness: 0.6,
    positions: {
      mobile: [-1, 1, 2],
      tablet: [-1, 1, 3],
      desktop: [-2, 0, 3]
    }
  },
  skills: { 
    color: '#4338ca',
    roughness: 0.2,
    positions: {
      mobile: [0, 0, 0],
      tablet: [0, 0, 0],
      desktop: [0, 0, 0]
    }
  },
  gallery: { 
    color: '#f97316',
    roughness: 0,
    positions: {
      mobile: [1, 0, 5],
      tablet: [1, 0, 5],
      desktop: [2, 0, 6]
    }
  },
  services: { 
    color: '#ec4899',
    roughness: 0.5,
    positions: {
      mobile: [-1, -1, 3],
      tablet: [-1, -1, 4],
      desktop: [-2, -1, 3]
    }
  },
  contact: { 
    color: '#eab308',
    roughness: 0.3,
    positions: {
      mobile: [1, -1, 2],
      tablet: [1, -1, 2],
      desktop: [2, -1, 5]
    }
  },
};

export default function Orb() {
  const meshRef = useRef();
  const materialRef = useRef();
  const activeSection = useActiveSection(Object.keys(sectionConfig));
  
  // State for device type and scale
  const [device, setDevice] = useState('desktop');
  const [scale, setScale] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice('mobile');
        setScale(1.0);
      } else if (width < 1024) {
        setDevice('tablet');
        setScale(1.2);
      } else {
        setDevice('desktop');
        setScale(1.5);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useFrame((state, delta) => {
    const config = sectionConfig[activeSection] || sectionConfig.hero;
    
    // Get target position based on device
    const targetPosArray = config.positions[device] || config.positions.desktop;
    const targetPosition = new THREE.Vector3(...targetPosArray);
    
    // Add subtle floating/drift effect for realism
    const time = state.clock.getElapsedTime();
    targetPosition.y += Math.sin(time * 0.5) * 0.1;
    targetPosition.x += Math.cos(time * 0.3) * 0.1;

    if (meshRef.current) {
      meshRef.current.position.lerp(targetPosition, 2 * delta);
      
      // Rotation
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }

    // Color Blending
    if (materialRef.current) {
      const targetColor = new THREE.Color(config.color);
      materialRef.current.color.lerp(targetColor, 2 * delta);

      // Roughness Blending
      const targetRoughness = config.roughness;
      materialRef.current.roughness = THREE.MathUtils.lerp(
        materialRef.current.roughness,
        targetRoughness,
        2 * delta
      );
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial
        ref={materialRef}
        transmission={1}
        roughness={0.2}
        metalness={0.1}
        thickness={1}
        flatShading={true}
      />
    </mesh>
  );
}
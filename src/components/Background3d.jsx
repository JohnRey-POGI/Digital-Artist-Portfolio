import React, { useState, useEffect } from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Orb from "./Orb"; // import the orb
import useActiveSection from "../hooks/useActiveSection";

const sectionBlurConfig = {
  hero: { mobile: "0px", tablet: "0px", desktop: "0px" },
  about: { mobile: "5px", tablet: "5px", desktop: "6px" },
  skills: { mobile: "3px", tablet: "3px", desktop: "4px" },
  gallery: { mobile: "0px", tablet: "0px", desktop: "0px" },
  services: { mobile: "5px", tablet: "5px", desktop: "6px" },
  contact: { mobile: "7px", tablet: "7px", desktop: "8px" },
};

export default function Background3D() {
  const activeSection = useActiveSection(Object.keys(sectionBlurConfig));
  const [blurAmount, setBlurAmount] = useState("0px");
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDevice("mobile");
      } else if (width < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const config = sectionBlurConfig[activeSection] || sectionBlurConfig.hero;
    setBlurAmount(config[device] || "8px");
  }, [activeSection, device]);

  return (
    <div 
      className="fixed inset-0 z-10 pointer-events-none transition-all duration-700 ease-in-out"
      style={{ filter: `blur(${blurAmount})` }}
    >
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 50 }} 
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Orb />
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
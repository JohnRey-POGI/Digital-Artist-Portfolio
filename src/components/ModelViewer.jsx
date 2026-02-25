import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

const ModelViewer = ({ modelUrl }) => {
  return (
    <div className="w-full max-h-[80vh] bg-black rounded-lg flex items-center justify-center">
      <Canvas
        gl={{ powerPreference: "low-power" ,
            failIfMajorPerformanceCaveat: false}}
        camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>
        <OrbitControls enablePan enableZoom />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
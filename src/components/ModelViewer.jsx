import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame  } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Environment, Bounds, Html, Float, useAnimations } from "@react-three/drei";

function Model({ url }) {
  const modelRef = useRef();
  const { scene, animations } = useGLTF(url);
  const { actions } = useAnimations(animations, modelRef);

  // useEffect(() => {
  //   if (actions) {
  //     Object.values(actions).forEach((action) => action.play());
  //   }
  // }, [actions]);

  useEffect(() => {
    if (!actions) return;

    Object.values(actions).forEach((action) => {
      if (action) action.play();
    });

  }, [actions]);


  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3; // infinite rotate
    }
  });

  return <primitive ref={modelRef} object={scene} scale={0.5} />;
  // const { scene } = useGLTF(url);
  // return (
  //   <Center>
  //     <primitive object={scene} scale={0.5} />
  //   </Center>
  // );
}

const ModelViewer = ({ modelUrl }) => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div
      className={`bg-black/20 rounded-lg overflow-hidden backdrop-blur-xs ${
        fullscreen
          ? "fixed inset-0 w-screen h-screen z-[100] flex items-center justify-center"
          : "relative w-[500px] md:w-[600px] lg:w-[700px] h-[50vh] md:h-[70vh] lg:h-[75vh]"
      }`}
    >
      {/* Fullscreen Button */}
      <button
        onClick={() => setFullscreen(!fullscreen)}
        className="absolute top-3 left-3 z-20 bg-black/60 text-white px-3 py-1 rounded hover:bg-black"
      >
        {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
      </button>
      
      <Canvas key={modelUrl} camera={{ position: [3, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        
        <Suspense fallback={<Loader />}>
          {/* Auto-fit camera */} 
            <Bounds fit clip observe margin={1.2}>
          <Center>
              {/* <Float
                speed={2}
                rotationIntensity={1}
                floatIntensity={2}
              >
              </Float> */}
                <Model url={modelUrl} />
          </Center>
            </Bounds>
        </Suspense>

        <OrbitControls
          target={[0, 0, 0]}
          enablePan
          enableZoom
          minDistance={2}
          maxDistance={20}
          dampingFactor={0.1}/>
        <Environment preset="forest" />
      </Canvas>
    </div>
  );
};

function Loader() {
  return (
    <Html center>
      <div className="text-white text-lg animate-pulse">
        Loading 3D Model...
      </div>
    </Html>
  );
}

export default ModelViewer;
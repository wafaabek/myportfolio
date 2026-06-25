import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Environment,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile, isTablet }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf");

  const scale = isMobile ? 0.22 : isTablet ? 0.30 : 0.38;

  const position = [
    isMobile ? 0 : isTablet ? 0.1 : 0.2,
    isMobile ? -1.15 : -1,
    isMobile ? -2.6 : isTablet ? -2.2 : -1.8,
  ];

  return (
    <>
      <ambientLight intensity={0.5} />

      <directionalLight
        position={[5, 8, 5]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <spotLight
        position={[-10, 15, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />

      <primitive
        object={computer.scene}
        scale={scale}
        position={position}
        rotation={[-0.05, -0.3, -0.05]}
        castShadow
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.2, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.25} />
      </mesh>
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 640px)");
    const tabletQuery = window.matchMedia("(max-width: 1024px)");

    setIsMobile(mobileQuery.matches);
    setIsTablet(tabletQuery.matches);

    const handleMobile = (e) => setIsMobile(e.matches);
    const handleTablet = (e) => setIsTablet(e.matches);

    mobileQuery.addEventListener("change", handleMobile);
    tabletQuery.addEventListener("change", handleTablet);

    return () => {
      mobileQuery.removeEventListener("change", handleMobile);
      tabletQuery.removeEventListener("change", handleTablet);
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <Canvas
        shadows
        frameloop="always"
        dpr={[1, 2]}
        camera={{
          position: [6, 7, 5],
          fov: 45,
        }}
        gl={{
          antialias: true,
          preserveDrawingBuffer: true,
        }}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <Environment preset="city" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.5}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />

          <Computers
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

useGLTF.preload("/desktop_pc/scene.gltf");

export default ComputersCanvas;
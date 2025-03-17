import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const SaturnModel = () => {
    const { scene } = useGLTF("/realistic_saturn_8k.glb");

    return (
        <Canvas style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 1 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} />
            <primitive object={scene} scale={2} position={[0, -1, 0]} />
            <OrbitControls />
        </Canvas>
    );
};

export default SaturnModel;

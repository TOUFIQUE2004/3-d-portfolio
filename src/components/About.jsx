import React, { useRef, Suspense } from "react";
import styled, { keyframes } from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";


const glowEffect = keyframes`
  0% { text-shadow: 0 0 10px rgba(255,255,150,0.3); }
  50% { text-shadow: 0 0 30px rgba(255,255,150,0.7); }
  100% { text-shadow: 0 0 10px rgba(255,255,150,0.3); }
`;

/ 🌟 Full Page Background with Stars/
const StarsBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: black;
  z-index: -2;
  overflow: hidden;
`;

// 🌍 About Section Layout
const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  max-width: 100vw;
  padding: 50px 80px;
  color: white;
  overflow: hidden;
  font-family: "Poppins", sans-serif;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
`;

// 📜 About Text with Glow Effect
const AboutText = styled.div`
  flex: 1;
  max-width: 600px;
  text-align: left;
  padding-right: 30px;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ddd;
  animation: ${glowEffect} 3s infinite alternate;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// 🌍 3D Earth Container
const GlobeContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 600px;
  height: 600px;

  @media (max-width: 1024px) {
    width: 100%;
    min-width: unset;
    height: auto;
  }
`;

// 🎨 3D Earth Component
const Earth = () => {
    const { scene } = useGLTF("/earth (1).glb");
    const meshRef = useRef();

    // ✅ Apply Texture
    const texture = new THREE.TextureLoader().load("/earth_texture.jpg");
    scene.traverse((child) => {
        if (child.isMesh) {
            child.material.map = texture;
            child.material.needsUpdate = true;
        }
    });

    // ✅ Add Glow Effect Around Earth
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff99,
        transparent: true,
        opacity: 0.4,
    });

    const glowSphere = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 32, 32),
        glowMaterial
    );

    scene.add(glowSphere);

    // ✅ Rotation & Floating Effect
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002; // Slow rotation
            meshRef.current.position.x = Math.sin(Date.now() * 0.0005) * 0.5;
            meshRef.current.position.y = Math.cos(Date.now() * 0.0005) * 0.3;
        }
    });

    return <primitive ref={meshRef} object={scene} scale={3} />;
};

// 📍 Function to Convert Latitude/Longitude to 3D Position
const getLatLonPosition = (lat, lon, radius = 3.1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    return new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

// 📍 Pinpoint for Serampore, West Bengal (Using pin.glb)
const Pinpoint = () => {
    const { scene } = useGLTF("/pin.glb"); // ✅ Load pin model
    const position = getLatLonPosition(22.7528, 88.3400); // Serampore, WB

    return (
        <primitive object={scene} position={position} scale={0.3} />
    );
};

// 🚀 About Component
const About = () => {
    return (
        <>
            {/* 🌟 Full Page Stars Background */}
            <StarsBackground className={"About"}>
                <Canvas style={{ width: "100%", height: "100%" }}>
                    <Stars radius={300} depth={100} count={10000} factor={5} fade />
                </Canvas>
            </StarsBackground>

            <AboutContainer>
                {/* 📜 Left Side - About Text */}
                <AboutText>
                    <Title>About Me</Title>
                    <Paragraph>
                        I am Md Toufique Sheikh, currently a third-year Information Technology student
                        at the Government College of Engineering and Textile Technology, Serampore (GCETTS).
                        I have completed courses in both basic and advanced Python and am currently interning at Kryptora.
                    </Paragraph>
                    <Paragraph>
                        Recently, I delved into Three.js during my semester break, exploring its capabilities
                        in 3D graphics and WebGL. I also developed a creative project bringing the iconic
                        Sharingan to life as my desktop wallpaper. Additionally, I embarked on a project to
                        develop a YouTube downloader using Python and Django.
                    </Paragraph>
                </AboutText>

                {/* 🌍 Right Side - 3D Earth */}
                <GlobeContainer>
                    <Canvas camera={{ position: [0, 0, 8] }} style={{ width: "100%", height: "100%" }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 5]} />
                        <Suspense fallback={null}>
                            <Earth />
                            <Pinpoint />
                        </Suspense>
                        <OrbitControls enableZoom={true} />
                    </Canvas>
                </GlobeContainer>
            </AboutContainer>
        </>
    );
};

export default About;

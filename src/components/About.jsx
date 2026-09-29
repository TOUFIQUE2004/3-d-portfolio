import React, { useRef, Suspense } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars } from "@react-three/drei";
import * as THREE from "three";

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
  min-height: 100vh;
  padding: 7rem clamp(1.25rem, 6vw, 6rem);
  color: white;
  overflow: hidden;
  font-family: "Poppins", sans-serif;
  background: radial-gradient(circle at 75% 35%, rgba(112, 77, 187, 0.2), transparent 34%);
`;

const Hero = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(2rem, 7vw, 7rem);
  max-width: 1200px;
  min-height: 70vh;
  margin: 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
    justify-content: center;
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
  margin: 0 0 1.2rem;
  font-size: clamp(2.5rem, 5vw, 4.8rem);
  font-weight: bold;
  line-height: 1;

  span {
    color: #b998ff;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  max-width: 650px;
  margin: 0 0 1rem;
  color: rgba(255, 255, 255, 0.72);
  font-size: 1.05rem;
  line-height: 1.75;

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
  width: min(600px, 100%);
  min-width: 0;
  height: min(600px, 48vw);

  @media (max-width: 1024px) {
    width: 100%;
    height: 420px;
  }

  @media (max-width: 600px) {
    height: 320px;
  }
`;

const Eyebrow = styled.div`
  margin-bottom: 1rem;
  color: #ffcc66;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const ResumeGrid = styled.div`
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 1.25rem;
  max-width: 1200px;
  margin: 3rem auto 0;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const ResumeCard = styled.article`
  padding: clamp(1.25rem, 3vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 18px;
  background: rgba(10, 11, 28, 0.68);
  backdrop-filter: blur(12px);
`;

const CardLabel = styled.div`
  margin-bottom: 1.25rem;
  color: #b998ff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.35rem;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.45rem 0 1rem;
  color: #ffcc66;
  font-size: 0.85rem;

  @media (max-width: 520px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const CardText = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  font-size: 0.92rem;
  line-height: 1.65;
`;

const List = styled.ul`
  display: grid;
  gap: 1.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding-left: 1rem;
  border-left: 2px solid #b998ff;
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

            <AboutContainer id="AboutContainer">
              <Hero>
                {/* 📜 Left Side - About Text */}
                <AboutText>
                <Eyebrow>Software engineer in orbit</Eyebrow>
                <Title>Hi, I&apos;m <span>Toufique.</span></Title>
                    <Paragraph>
                  I&apos;m an aspiring Software Development Engineer and Information Technology student at the Government College of Engineering and Textile Technology, Serampore.
                    </Paragraph>
                    <Paragraph>
                  I enjoy turning ambiguous problems into reliable products, with a focus on data structures, object-oriented design, distributed systems, and thoughtful user experiences. I build with Java, Python, JavaScript, React, Django, and relational databases.
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
              </Hero>

              <ResumeGrid>
                <ResumeCard>
                  <CardLabel>Experience</CardLabel>
                  <CardTitle>Software Engineering Intern</CardTitle>
                  <CardMeta><span>Kryptora Infotech</span><span>Dec 2023 - May 2024</span></CardMeta>
                  <CardText>
                    Built Django and Python systems for car assistance and local store management. Refactored legacy modules with object-oriented design, improving system reliability by 30%, and implemented database-backed inventory workflows to automate stock tracking.
                  </CardText>
                </ResumeCard>

                <ResumeCard>
                  <CardLabel>Education</CardLabel>
                  <CardTitle>B.Tech in Information Technology</CardTitle>
                  <CardMeta><span>GCETTS, Serampore</span><span>2023 - 2027</span></CardMeta>
                  <CardText>Coursework includes distributed systems, object-oriented design, data structures and algorithms, complexity analysis, and relational databases.</CardText>
                </ResumeCard>

                <ResumeCard>
                  <CardLabel>Certifications</CardLabel>
                  <List>
                    <ListItem><CardTitle>Python Core Developer</CardTitle><CardText>Kryptora Infotech Pvt. Ltd. · 2021</CardText></ListItem>
                    <ListItem><CardTitle>Python Advanced Developer</CardTitle><CardText>Kryptora Infotech Pvt. Ltd. · 2021</CardText></ListItem>
                  </List>
                </ResumeCard>

                <ResumeCard>
                  <CardLabel>Currently exploring</CardLabel>
                  <CardTitle>Federated learning &amp; AI</CardTitle>
                  <CardText>Working on research into heart disease detection using federated learning and AI models. Also placed third in an internal Smart India Hackathon.</CardText>
                </ResumeCard>
              </ResumeGrid>
            </AboutContainer>
        </>
    );
};

export default About;

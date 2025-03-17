import React, { useRef } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// 🌌 Styled Components
const ContactContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url("/parallex.jpg") center/cover fixed no-repeat;
    padding: 20px;
    position: relative;
    color: white;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    max-width: 1200px;
`;

const MarsContainer = styled.div`
    width: 50%;
    height: 400px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const FormWrapper = styled.div`
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;

    &:focus {
        border: 2px solid #ff4081;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    outline: none;
    resize: none;
    height: 120px;

    &:focus {
        border: 2px solid #ff4081;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 12px;
    margin-top: 10px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    background: #ff4081;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        background: #e73370;
    }
`;

// ✅ Mars Component Inside Contact.jsx
const Mars = () => {
    const marsRef = useRef();
    const { scene } = useGLTF("/mars (2).glb"); // Ensure mars.glb is in public folder

    // 🔄 Rotation & Floating Animation
    useFrame(() => {
        if (marsRef.current) {
            marsRef.current.rotation.y += 0.003; // Slow rotation
            marsRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2; // Floating effect
        }
    });

    return <primitive ref={marsRef} object={scene} scale={2} position={[-3, 0, 0]} />;
};

const Contact = () => {
    return (
        <ContactContainer>
            <ContentWrapper>
                {/* 🚀 Mars 3D Model on Left */}
                <MarsContainer>
                    <Canvas camera={{ position: [0, 0, 5] }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[2, 2, 5]} />
                        <Mars />
                        <OrbitControls enableZoom={false} />
                    </Canvas>
                </MarsContainer>

                {/* 📩 Contact Form */}
                <FormWrapper>
                    <Title>📩 Contact Me</Title>
                    <Input type="text" placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <Textarea placeholder="Your Message" />
                    <Button>Send</Button>
                </FormWrapper>
            </ContentWrapper>
        </ContactContainer>
    );
};

export default Contact;

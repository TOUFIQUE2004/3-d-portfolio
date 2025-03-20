import React, { useRef } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import emailjs from "@emailjs/browser";

// 🌌 Styled Components
const ContactContainer = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url("/parallex.jpg.jpg") center/cover fixed no-repeat;
    padding: 20px;
    position: relative;
    color: white;
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 90%;
    max-width: 1200px;
    flex-wrap: wrap;
`;

const MarsWrapper = styled.div`
    width: 400px;
    height: 400px;
`;

const FormWrapper = styled.form`
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
    background: rgb(175, 112, 79);
    color: white;
    outline: none;
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

// 🌍 Mars 3D Model
const Mars = ({ scale }) => {
    const marsRef = useRef();
    const { scene } = useGLTF("/mars (2).glb");

    useFrame(() => {
        if (marsRef.current) {
            marsRef.current.rotation.y += 0.002;
        }
    });

    return <primitive ref={marsRef} object={scene} scale={scale} />;
};

// 📩 Contact Component
const Contact = () => {
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_agmiqnn",
                "template_9hxwm7n",
                formRef.current,
                "j1mSOoNK3s9xG2x4y"
            )
            .then(
                (result) => {
                    alert("Message sent successfully!");
                    formRef.current.reset();
                },
                (error) => {
                    console.error(error.text);
                    alert("Something went wrong. Please try again.");
                }
            );
    };

    return (
        <ContactContainer>
            <ContentWrapper>
                <MarsWrapper>
                    <Canvas camera={{ position: [0, 0, 2.5] }}>
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[3, 2, 1]} />
                        <Mars scale={1.5} />
                        <OrbitControls enableZoom minDistance={2} maxDistance={7} />
                    </Canvas>
                </MarsWrapper>

                <FormWrapper ref={formRef} onSubmit={handleSubmit}>
                    <Title>📩 Contact Me</Title>
                    <Input type="text" name="name" placeholder="Your Name" required />
                    <Input type="email" name="email" placeholder="Your Email" required />
                    <Input type="text" name="title" placeholder="Subject" required />
                    <Textarea name="message" placeholder="Your Message" required />
                    <Button type="submit">Send</Button>
                </FormWrapper>
            </ContentWrapper>
        </ContactContainer>
    );
};

export default Contact;

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import emailjs from "@emailjs/browser";
import { MdArrowOutward, MdEmail, MdSend } from "react-icons/md";

// 🌌 Styled Components
const ContactContainer = styled.section`
    min-height: calc(100vh - 76px);
    display: flex;
    align-items: center;
    justify-content: center;
    background:
        linear-gradient(90deg, rgba(4, 6, 16, 0.42), rgba(4, 6, 16, 0.72)),
        url("/parallex.jpg.jpg") center/cover fixed no-repeat;
    padding: 7rem 2rem 6rem;
    position: relative;
    color: white;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 22% 50%, rgba(233, 142, 104, 0.18), transparent 30%);
        pointer-events: none;
    }
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: clamp(2rem, 7vw, 7rem);
    width: min(1120px, 100%);

    @media (max-width: 820px) {
        flex-direction: column;
        gap: 1rem;
    }
`;

const MarsWrapper = styled.div`
    flex: 1 1 48%;
    width: min(480px, 100%);
    height: clamp(280px, 42vw, 480px);

    @media (max-width: 820px) {
        height: 300px;
        order: 2;
    }
`;

const FormWrapper = styled.form`
    flex: 0 1 500px;
    box-sizing: border-box;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 24px;
    background: rgba(12, 15, 29, 0.68);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42), inset 0 1px rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(18px);

    @media (max-width: 820px) {
        width: 100%;
        max-width: 560px;
        order: 1;
    }
`;

const Heading = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    margin-bottom: 1.8rem;
`;

const EmailIcon = styled(MdEmail)`
    flex: 0 0 auto;
    margin-top: 0.2rem;
    color: #ff9c78;
    font-size: 2rem;
`;

const Eyebrow = styled.span`
    display: block;
    margin-bottom: 0.35rem;
    color: #ff9c78;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
`;

const Title = styled.h1`
    margin: 0;
    color: #fff;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1;
`;

const Intro = styled.p`
    margin: 0 0 1.5rem;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.94rem;
    line-height: 1.6;
`;

const Field = styled.label`
    display: block;
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.04em;
`;

const Control = styled.input`
    display: block;
    box-sizing: border-box;
    width: 100%;
    margin-top: 0.45rem;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    outline: none;
    background: rgba(255, 255, 255, 0.09);
    color: #fff;
    font: inherit;
    transition: border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;

    &::placeholder {
        color: rgba(255, 255, 255, 0.42);
    }

    &:focus {
        border-color: #ff9c78;
        background: rgba(255, 255, 255, 0.13);
        box-shadow: 0 0 0 3px rgba(255, 156, 120, 0.14);
    }
`;

const Textarea = styled.textarea`
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-height: 120px;
    margin-top: 0.45rem;
    padding: 0.85rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 10px;
    outline: none;
    resize: vertical;
    background: rgba(255, 255, 255, 0.09);
    color: #fff;
    font: inherit;
    line-height: 1.5;

    &::placeholder {
        color: rgba(255, 255, 255, 0.42);
    }

    &:focus {
        border-color: #ff9c78;
        box-shadow: 0 0 0 3px rgba(255, 156, 120, 0.14);
    }
`;

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    margin-top: 1.4rem;
    padding: 0.9rem 1.2rem;
    outline: none;
    border: 0;
    border-radius: 10px;
    background: #ff8066;
    color: #1c1012;
    font-size: 0.96rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;

    &:hover {
        background: #ff9c78;
        box-shadow: 0 10px 28px rgba(255, 128, 102, 0.25);
        transform: translateY(-2px);
    }

    &:disabled {
        cursor: wait;
        opacity: 0.7;
        transform: none;
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
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs
            .sendForm(
                "service_agmiqnn",
                "template_9hxwm7n",
                formRef.current,
                "j1mSOoNK3s9xG2x4y"
            )
            .then(
                () => {
                    formRef.current.reset();
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.error(error.text);
                    alert("Something went wrong. Please try again.");
                }
            )
            .finally(() => setIsSending(false));
    };

    return (
        <ContactContainer id="Contact">
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
                    <Heading>
                        <EmailIcon aria-hidden="true" />
                        <div>
                            <Eyebrow>Open transmission</Eyebrow>
                            <Title>Contact Me</Title>
                        </div>
                    </Heading>
                    <Intro>Have a project in orbit? Send a signal and let&apos;s build something memorable.</Intro>
                    <Field>Name<Control type="text" name="name" placeholder="Your name" required /></Field>
                    <Field>Email<Control type="email" name="email" placeholder="you@example.com" required /></Field>
                    <Field>Subject<Control type="text" name="title" placeholder="What are we making?" required /></Field>
                    <Field>Message<Textarea name="message" placeholder="Tell me a little about your idea..." required /></Field>
                    <Button type="submit" disabled={isSending}>
                        {isSending ? "Sending..." : "Send message"}
                        {isSending ? <MdSend aria-hidden="true" /> : <MdArrowOutward aria-hidden="true" />}
                    </Button>
                </FormWrapper>
            </ContentWrapper>
        </ContactContainer>
    );
};

export default Contact;

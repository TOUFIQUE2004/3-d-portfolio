import React from "react";
import styled from "styled-components";
import {color} from "framer-motion";

// 🌌 Styled Components
const ContactContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: url("/parallex.jpg.jpg") center/cover fixed no-repeat;
    padding: 20px;
    position: relative;
    color: white;
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
    background: rgb(22, 1, 209);
    color: #092cd9;
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
    color: #1601d1;
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
    color: #1601d1;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        background: #e73370;
    }
`;

const Contact = () => {
    return (
        <ContactContainer className={"Contact"}>
            <FormWrapper>
                <Title>📩 Contact Me</Title>
                <Input type="text" placeholder="Your Name"  style={{color: "white"}}/>
                <Input type="email" placeholder="Your Email"  style={{color: "white"}} />
                <Textarea placeholder="Your Message"   style={{color: "white"}}/>
                <Button>Send</Button>
            </FormWrapper>
        </ContactContainer>
    );
};

export default Contact;
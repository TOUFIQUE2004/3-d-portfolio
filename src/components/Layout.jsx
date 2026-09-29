import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const CanvasBackground = styled.div`
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background: #05070d;

    canvas {
        width: 100% !important;
        height: 100% !important;
        display: block;
    }
`;

const PageWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    isolation: isolate;
`;

const MainContent = styled.main`
    position: relative;
    z-index: 0;
    flex: 1;
    width: 100%;
`;

const Layout = ({ children }) => {
    return (
        <>
            <CanvasBackground aria-hidden="true">
                <Canvas camera={{ fov: 50, position: [0, 0, 10] }}>
                    <ambientLight intensity={0.4} />
                    <Stars radius={100} depth={50} count={2500} factor={3} fade speed={0.5} />
                </Canvas>
            </CanvasBackground>
            <PageWrapper>
                <Navbar />
                <MainContent>{children}</MainContent>
                <Footer />
            </PageWrapper>
        </>
    );
};

export default Layout;

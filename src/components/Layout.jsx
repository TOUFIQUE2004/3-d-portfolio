import React from "react";
import styled from "styled-components";

// 🌟 Parallax Background Wrapper
const ParallaxBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-image: url("/parallex.jpg.jpg"); /* Add your image here */
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Creates the Parallax Effect */
    z-index: -5; /* Ensures it stays behind everything */
`;

// 🌌 Layout Wrapper
const PageWrapper = styled.div`
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Layout = ({ children }) => {
    return (
        <>
            <ParallaxBackground />
            <PageWrapper>{children}</PageWrapper>
        </>
    );
};

export default Layout;

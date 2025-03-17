import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-scroll"; // ✅ Use react-scroll for smooth scrolling

// ✅ Jelly Animation for Hover Effect
const jelly = keyframes`
    0% { transform: scale(1, 1); }
    30% { transform: scale(1.1, 0.9); }
    60% { transform: scale(0.9, 1.1); }
    100% { transform: scale(1, 1); }
`;

// ✅ Glowing effect on Navbar
const glow = keyframes`
    0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
    50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.6); }
    100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.2); }
`;

// ✅ **Styled Navbar Container**
const NavbarContainer = styled.nav`
    background: rgba(10, 10, 25, 0.9);
    backdrop-filter: blur(10px);
    padding: 1rem 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: 100vw;
    z-index: 1000;
    animation: ${glow} 3s infinite alternate;
    border-bottom: 2px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
`;

// ✅ **Nav Items Wrapper**
const NavItems = styled.div`
    display: flex;
    gap: 30px;
`;

// ✅ **Styled Links with Hover Effect**
const NavLink = styled(Link)`
    color: white;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    text-decoration: none;
    font-weight: 600;
    position: relative;
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        animation: ${jelly} 0.4s ease-in-out;
        color: #ffcc00;
    }

    &::after {
        content: "";
        display: block;
        width: 0;
        height: 3px;
        background: #ffcc00;
        transition: width 0.3s ease-in-out;
        position: absolute;
        left: 50%;
        bottom: -4px;
        transform: translateX(-50%);
    }

    &:hover::after {
        width: 100%;
    }
`;

// ✅ **Navbar Logo**
const NavLogo = styled.a`
    color: #fff;
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        color: #ffcc00;
    }
`;

// ✅ **Main Navbar Component**
const Navbar = () => {
    return (
        <NavbarContainer>
            <NavLogo href="#">MY PORTFOLIO</NavLogo>
            <NavItems>
                <NavLink to="AboutContainer" smooth={true} duration={800} offset={-80}>About</NavLink>
                <NavLink to="Skills" smooth={true} duration={800} offset={-80}>Skills</NavLink>
                <NavLink to="Projects" smooth={true} duration={800} offset={-80}>Projects</NavLink>
                <NavLink to="Contact" smooth={true} duration={800} offset={-80}>Contact</NavLink>
            </NavItems>
        </NavbarContainer>
    );
};

export default Navbar;

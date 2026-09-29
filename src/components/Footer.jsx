import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const FooterContainer = styled.footer`
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 72px;
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.14);
    background: rgba(5, 7, 13, 0.82);
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    backdrop-filter: blur(12px);
    flex-direction: column;
    gap: 0.35rem;
`;

const VisitCount = styled.small`
    color: rgba(255, 204, 102, 0.72);
    font-size: 0.72rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 1rem;
`;

const SocialLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: rgba(255, 255, 255, 0.72);
    font-size: 0.78rem;
    text-decoration: none;

    &:hover {
        color: #ffcc66;
    }
`;

const Footer = () => {
    const hasCounted = useRef(false);
    const [visitCount, setVisitCount] = useState(null);

    useEffect(() => {
        if (hasCounted.current) return;
        hasCounted.current = true;

        const key = "md-toufique-portfolio-visits";
        const nextCount = Number.parseInt(localStorage.getItem(key) || "0", 10) + 1;
        localStorage.setItem(key, String(nextCount));
        setVisitCount(nextCount);
    }, []);

    return (
        <FooterContainer>
            <small>© {new Date().getFullYear()} Md Toufique Sheikh</small>
            <SocialLinks aria-label="Social profiles">
                <SocialLink href="https://github.com/TOUFIQUE2004" target="_blank" rel="noreferrer">
                    <FaGithub aria-hidden="true" /> GitHub
                </SocialLink>
                <SocialLink href="https://www.linkedin.com/in/toufique2004" target="_blank" rel="noreferrer">
                    <FaLinkedin aria-hidden="true" /> LinkedIn
                </SocialLink>
                <SocialLink href="https://leetcode.com/u/Toufiques/" target="_blank" rel="noreferrer">
                    <SiLeetcode aria-hidden="true" /> LeetCode
                </SocialLink>
            </SocialLinks>
            {visitCount !== null && <VisitCount>{visitCount.toLocaleString()} visits</VisitCount>}
        </FooterContainer>
    );
};

export default Footer;
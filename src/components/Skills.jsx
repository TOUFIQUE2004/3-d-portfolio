import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

const skills = [
    "Java", "Python", "JavaScript", "C/C++", "React", "Next.js", "Django", "Express.js",
    "MySQL", "PostgreSQL", "Git", "BeautifulSoup",
];

const SkillsSection = styled.section`
    position: relative;
    display: grid;
    grid-template-columns: minmax(250px, 0.75fr) minmax(420px, 1.25fr);
    align-items: center;
    gap: clamp(1rem, 5vw, 5rem);
    min-height: 115vh;
    padding: 9rem clamp(1.25rem, 6vw, 6rem) 11rem;
    box-sizing: border-box;
    overflow: hidden;
    color: white;
    background: radial-gradient(circle at 70% 50%, rgba(109, 79, 194, 0.22), transparent 34%), #080914;

    @media (max-width: 840px) {
        grid-template-columns: 1fr;
        min-height: auto;
        padding-block: 6rem;
    }
`;

const Copy = styled.div`
    position: relative;
    z-index: 2;
    max-width: 430px;

    @media (max-width: 840px) {
        max-width: 600px;
        margin: 0 auto;
        text-align: center;
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

const Title = styled.h2`
    margin: 0 0 1rem;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2.5rem, 5vw, 4.8rem);
    line-height: 0.98;
`;

const Description = styled.p`
    margin: 0 0 1.8rem;
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.7;
`;

const SkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;

    @media (max-width: 840px) {
        justify-content: center;
    }
`;

const SkillTag = styled.span`
    padding: 0.55rem 0.75rem;
    border: 1px solid rgba(185, 152, 255, 0.3);
    border-radius: 999px;
    background: rgba(185, 152, 255, 0.08);
    color: rgba(255, 255, 255, 0.84);
    font-size: 0.8rem;
`;

const Stage = styled.div`
    position: relative;
    width: min(700px, 100%);
    aspect-ratio: 1;
    min-height: 0;
    margin: 0 auto;

    @media (max-width: 520px) {
        width: min(420px, 100%);
    }
`;

const Sphere = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: clamp(220px, 32vw, 340px);
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    background: radial-gradient(circle at 32% 25%, #d4c2ff 0%, #7c54cf 25%, #25164f 70%, #0e0a22 100%);
    box-shadow: 0 0 45px rgba(143, 100, 255, 0.5), inset -24px -18px 35px rgba(0, 0, 0, 0.5);

    &::after {
        content: "";
        position: absolute;
        inset: 12%;
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        transform: rotate(-25deg) scaleY(0.3);
    }
`;

const Ring = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 82%;
    height: 35%;
    border: 1px solid rgba(255, 204, 102, 0.35);
    border-radius: 50%;
    transform: translate(-50%, -50%) rotate(-18deg);
    box-shadow: 0 0 24px rgba(255, 204, 102, 0.1);
`;

const Orbit = styled.div`
    position: absolute;
    inset: 10%;
    border: 1px solid rgba(185, 152, 255, 0.28);
    border-radius: 50%;
`;

const Badge = styled.span`
    position: absolute;
    left: 50%;
    top: -0.75rem;
    padding: 0.55rem 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-radius: 999px;
    background: rgba(18, 15, 38, 0.88);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
    color: white;
    font-size: 0.72rem;
    white-space: nowrap;
    transform: translate(-50%, -50%);
`;

const Stars = () => {
    const positions = new Float32Array(Array.from({ length: 600 }, () => (Math.random() - 0.5) * 20));

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="white" />
        </points>
    );
};

const Skills = () => {
    return (
    <SkillsSection id="Skills">
        <Canvas
            camera={{ position: [0, 0, 8] }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
            <Stars />
        </Canvas>

        <Copy>
            <Eyebrow>Toolkit / 2026</Eyebrow>
            <Title>Top skills</Title>
            <Description>
                A practical toolkit for building reliable products, from data collection and backend systems to polished interfaces.
            </Description>
            <SkillList>{skills.map((skill) => <SkillTag key={skill}>{skill}</SkillTag>)}</SkillList>
        </Copy>

        <Stage aria-label="Skills orbiting around a sphere">
            <Ring />
            <Sphere />
            <Orbit>{skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2 - Math.PI / 2;
                const radius = 45;
                const left = 50 + Math.cos(angle) * radius;
                const top = 50 + Math.sin(angle) * radius;

                return (
                <Badge key={skill} style={{ left: `${left}%`, top: `${top}%` }}>
                    {skill}
                </Badge>
                );
            })}</Orbit>
        </Stage>
    </SkillsSection>
    );
};

export { Skills };
export default Skills;

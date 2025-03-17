import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// ✅ Styled Components for UI
const ProjectsContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4rem 2rem;
    background-color: #0a0a0a;
    color: white;
    min-height: 100vh;
    overflow: hidden;
    position: relative; /* Ensures layering over stars */
`;

// 🌟 Starry Background Container
const StarsBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: black;
    z-index: -1; /* Places it behind content */
    overflow: hidden;
`;

// 📦 Projects Grid
const ProjectsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    width: 80%;
    margin-top: 2rem;
`;

// 🎴 Project Cards
const ProjectCard = styled(motion.a)`
    background: linear-gradient(145deg, #1e1e1e, #292929);
    padding: 1.5rem;
    border-radius: 15px;  /* Cube-like rounded effect */
    text-decoration: none;
    color: white;
    perspective: 1000px;  /* Enables 3D perspective */
    transform-style: preserve-3d;
    box-shadow: 4px 4px 15px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 6px 6px 20px rgba(255, 255, 255, 0.3);
    }
`;

const ProjectTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
    font-size: 1rem;
    color: #bbb;
`;

const ProjectLanguage = styled.span`
    display: inline-block;
    background: rgba(255, 255, 255, 0.1);
    padding: 0.4rem 1rem;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 0.9rem;
    font-weight: bold;
`;

const ErrorText = styled.p`
    color: red;
    font-size: 1.2rem;
    margin-top: 2rem;
`;

// ✅ Main Projects Component with Parallax & Jelly Effect
const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState("");

    // Scroll-based Parallax Effect
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    useEffect(() => {
        fetch("https://api.github.com/users/TOUFIQUE2004/repos")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch projects");
                return res.json();
            })
            .then((data) => setRepos(data))
            .catch((err) => setError(err.message));
    }, []);

    return (
        <>
            {/* 🌟 Starry Background */}
            <StarsBackground>
                <Canvas style={{ width: "100%", height: "100%" }}>
                    <Stars radius={300} depth={100} count={8000} factor={5} fade speed={1} />
                </Canvas>
            </StarsBackground>

            <ProjectsContainer id="Projects" style={{ y }}>
                <motion.h2
                    style={{ fontSize: "2.5rem" }}
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    My GitHub Projects
                </motion.h2>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <ProjectsGrid>
                    {repos.map((repo, index) => (
                        <ProjectCard
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}

                            whileHover={{
                                scale: [1, 1.05, 1],
                                rotate: ["0deg", "2deg", "-2deg", "0deg"],
                                transition: {
                                    duration: 0.5,
                                    ease: "easeInOut",
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 10
                                }
                            }}

                            whileTap={{
                                scale: 0.95,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <ProjectTitle>{repo.name}</ProjectTitle>
                            <ProjectDescription>
                                {repo.description ? repo.description : "No description available."}
                            </ProjectDescription>
                            {repo.language && <ProjectLanguage>{repo.language}</ProjectLanguage>}
                        </ProjectCard>
                    ))}
                </ProjectsGrid>
            </ProjectsContainer>
        </>
    );
};

export default Projects;

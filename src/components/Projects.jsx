import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// ✅ Styled Components for UI
const ProjectsContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 7rem clamp(1.25rem, 6vw, 6rem);
    background: linear-gradient(180deg, rgba(10, 10, 10, 0.92), #070812);
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
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr));
    gap: 1rem;
    width: min(100%, 1200px);
    margin-top: 2.5rem;
`;

// 🎴 Project Cards
const ProjectCard = styled(motion.a)`
    display: flex;
    flex-direction: column;
    min-height: 250px;
    padding: 1.5rem;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.045);
    text-decoration: none;
    color: white;
    transition: border-color 0.25s ease, background 0.25s ease, transform 0.25s ease;

    &:hover {
        border-color: rgba(255, 204, 102, 0.65);
        background: rgba(255, 255, 255, 0.08);
        transform: translateY(-4px);
    }
`;

const ProjectTitle = styled.h3`
    margin: 0 0 0.75rem;
    color: #fff;
    font-size: 1.25rem;
`;

const ProjectDescription = styled.p`
    flex: 1;
    margin: 0;
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.94rem;
    line-height: 1.6;
`;

const ProjectMeta = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 0.85rem;
    margin-top: 1.5rem;
    color: rgba(255, 255, 255, 0.52);
    font-size: 0.76rem;
`;

const ProjectLanguage = styled.span`
    color: #ffcc66;
    font-weight: 700;
`;

const SectionHeader = styled.div`
    width: min(100%, 1200px);
`;

const Eyebrow = styled.div`
    margin-bottom: 0.75rem;
    color: #ffcc66;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
`;

const SectionTitle = styled.h2`
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
`;

const SectionIntro = styled.p`
    max-width: 600px;
    margin: 1rem 0 0;
    color: rgba(255, 255, 255, 0.66);
    line-height: 1.6;
`;

const StatusText = styled.p`
    width: min(100%, 1200px);
    margin: 2.5rem 0 0;
    color: rgba(255, 255, 255, 0.62);
`;

const GithubLink = styled.a`
    display: inline-block;
    margin-top: 2rem;
    color: #ffcc66;
    font-size: 0.85rem;
    font-weight: 700;
    text-decoration: none;

    &:hover {
        color: #fff;
    }
`;

// ✅ Main Projects Component with Parallax & Jelly Effect
const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("https://api.github.com/users/TOUFIQUE2004/repos")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch projects");
                return res.json();
            })
            .then((data) => {
                const sortedRepos = data
                    .filter((repo) => !repo.fork)
                    .sort((firstRepo, secondRepo) => {
                        const score = (repo) => repo.stargazers_count * 10 + repo.forks_count;
                        return score(secondRepo) - score(firstRepo) || new Date(secondRepo.updated_at) - new Date(firstRepo.updated_at);
                    });
                setRepos(sortedRepos);
            })
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            {/* 🌟 Starry Background */}
            <StarsBackground>
                <Canvas style={{ width: "100%", height: "100%" }}>
                    <Stars radius={300} depth={100} count={8000} factor={5} fade speed={1} />
                </Canvas>
            </StarsBackground>

            <ProjectsContainer id="Projects">
                <SectionHeader
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Eyebrow>Selected work from GitHub</Eyebrow>
                    <SectionTitle>Projects with a pulse</SectionTitle>
                    <SectionIntro>Explore the repositories I am actively building, refining, and sharing in public.</SectionIntro>
                    <GithubLink href="https://github.com/TOUFIQUE2004?tab=repositories" target="_blank" rel="noopener noreferrer">
                        View all repositories -&gt;
                    </GithubLink>
                </SectionHeader>
                {isLoading && <StatusText>Loading the latest repositories...</StatusText>}
                {error && <StatusText>GitHub projects are temporarily unavailable. Please visit my profile to browse them.</StatusText>}
                {!isLoading && !error && repos.length === 0 && <StatusText>No public repositories found yet.</StatusText>}
                {!isLoading && !error && repos.length > 0 && <ProjectsGrid>
                    {repos.map((repo, index) => (
                        <ProjectCard
                            key={repo.id}
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}

                            whileTap={{ scale: 0.98 }}
                        >
                            <ProjectTitle>{repo.name}</ProjectTitle>
                            <ProjectDescription>
                                {repo.description ? repo.description : "No description available."}
                            </ProjectDescription>
                            <ProjectMeta>
                                {repo.language && <ProjectLanguage>{repo.language}</ProjectLanguage>}
                                <span>{repo.stargazers_count} stars</span>
                                <span>{repo.forks_count} forks</span>
                                <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                            </ProjectMeta>
                        </ProjectCard>
                    ))}
                </ProjectsGrid>}
            </ProjectsContainer>
        </>
    );
};

export default Projects;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StatsSection = styled.section`
    padding: 5rem clamp(1.25rem, 6vw, 6rem);
    background: rgba(7, 8, 18, 0.9);
    color: white;
`;

const SectionInner = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Eyebrow = styled.div`
    margin-bottom: 0.75rem;
    color: #ffcc66;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
`;

const Title = styled.h2`
    margin: 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3.4rem);
`;

const Intro = styled.p`
    max-width: 580px;
    margin: 1rem 0 2rem;
    color: rgba(255, 255, 255, 0.66);
    line-height: 1.6;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;

    @media (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`;

const StatsLink = styled.a`
    display: block;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.13);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);

    &:hover {
        border-color: rgba(255, 204, 102, 0.5);
    }
`;

const StatsCard = styled.img`
    display: block;
    width: 100%;
    min-height: 210px;
    object-fit: contain;
`;

const GithubCard = styled.div`
    min-height: 210px;
    padding: 1.75rem;
    box-sizing: border-box;
`;

const GithubHeading = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const GithubName = styled.strong`
    color: #fff;
    font-size: 1.2rem;
`;

const GithubHandle = styled.span`
    display: block;
    margin-top: 0.25rem;
    color: #b998ff;
    font-size: 0.78rem;
`;

const GithubMark = styled.span`
    color: #ffcc66;
    font-size: 1.6rem;
`;

const GithubStats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
`;

const GithubStat = styled.div`
    padding: 0.85rem 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    text-align: center;
`;

const GithubValue = styled.strong`
    display: block;
    color: #fff;
    font-size: 1.15rem;
`;

const GithubLabel = styled.span`
    display: block;
    margin-top: 0.25rem;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.7rem;
`;

const GithubCardContent = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        fetch("https://api.github.com/users/TOUFIQUE2004")
            .then((response) => {
                if (!response.ok) throw new Error("GitHub profile unavailable");
                return response.json();
            })
            .then(setProfile)
            .catch(() => setProfile({ error: true }));
    }, []);

    if (!profile) return <GithubCard>Loading GitHub activity...</GithubCard>;
    if (profile.error) return <GithubCard>GitHub activity is temporarily unavailable.</GithubCard>;

    return (
        <GithubCard>
            <GithubHeading>
                <div>
                    <GithubName>{profile.name || "Md Toufique Sheikh"}</GithubName>
                    <GithubHandle>@{profile.login}</GithubHandle>
                </div>
                <GithubMark aria-hidden="true">GH</GithubMark>
            </GithubHeading>
            <GithubStats>
                <GithubStat><GithubValue>{profile.public_repos}</GithubValue><GithubLabel>Repositories</GithubLabel></GithubStat>
                <GithubStat><GithubValue>{profile.followers}</GithubValue><GithubLabel>Followers</GithubLabel></GithubStat>
                <GithubStat><GithubValue>{profile.following}</GithubValue><GithubLabel>Following</GithubLabel></GithubStat>
            </GithubStats>
        </GithubCard>
    );
};

const ProfileStats = () => (
    <StatsSection id="Stats">
        <SectionInner>
            <Eyebrow>Public coding footprint</Eyebrow>
            <Title>Building in public</Title>
            <Intro>Explore my current GitHub activity and LeetCode problem-solving progress.</Intro>
            <StatsGrid>
                <StatsLink href="https://github.com/TOUFIQUE2004" target="_blank" rel="noreferrer">
                    <GithubCardContent />
                </StatsLink>
                <StatsLink href="https://leetcode.com/u/Toufiques/" target="_blank" rel="noreferrer">
                    <StatsCard
                        src="https://leetcard.jacoblin.cool/Toufiques?theme=dark&font=Karma&ext=heatmap"
                        alt="LeetCode statistics for Toufiques"
                        loading="lazy"
                    />
                </StatsLink>
            </StatsGrid>
        </SectionInner>
    </StatsSection>
);

export default ProfileStats;
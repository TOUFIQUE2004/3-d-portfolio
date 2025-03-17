import * as THREE from "three";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

// ✅ Skills Data (with images)
const skills = [
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "MATLAB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg" },
    { name: "Octave", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Gnu-octave-logo.svg/120px-Gnu-octave-logo.svg.png" },
    { name: "C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" }, // 🔵 Added C Language
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" } // 🐬 Added MySQL
];

// ✅ Star Background Component
const Stars = () => {
    const ref = useRef();
    const starPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 500; i++) {
            positions.push(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
        }
        return new Float32Array(positions);
    }, []);

    useFrame(() => {
        ref.current.rotation.y += 0.0005; // Slow twinkling rotation effect
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={starPositions.length / 3} array={starPositions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="white" />
        </points>
    );
};

// ✅ Rotating Sphere
const RotatingGlobe = () => {
    const ref = useRef();

    useFrame(() => {
        ref.current.rotation.y += 0.002; // Smooth rotation
    });

    return (
        <mesh ref={ref}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshStandardMaterial color="purple" emissive="purple" emissiveIntensity={0.5} transparent opacity={0.8} />
        </mesh>
    );
};

// ✅ Skill Icons Orbiting the Sphere
const SkillIcon = ({ skill, radius, angleOffset }) => {
    const ref = useRef();
    const texture = useLoader(THREE.TextureLoader, skill.url);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        ref.current.position.x = Math.cos(t + angleOffset) * radius;
        ref.current.position.z = Math.sin(t + angleOffset) * radius;
        ref.current.position.y = Math.sin(t * 0.5) * 1; // Bobbing effect
    });

    return (
        <group ref={ref}>
            <mesh>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial map={texture} transparent />
            </mesh>
            {/* Skill Name Below Icon */}
            <Html position={[0, -0.8, 0]} center>
                <span style={{ color: "white", fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
                    {skill.name}
                </span>
            </Html>
        </group>
    );
};

// ✅ 3D Scene with Dark Theme & Stars
const SkillsScene = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 8] }}
            style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none" }}
        >
            <Stars /> {/* ✨ Add the stars in the background */}
            <ambientLight intensity={1.5} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <RotatingGlobe />
            {skills.map((skill, i) => (
                <SkillIcon key={i} skill={skill} radius={4.5} angleOffset={i * (Math.PI / 4)} />
            ))}
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
};

// ✅ Main Component with Dark Theme
const Skills = () => {
    return (
        <div id="Skills" style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100vh",
            background: "#0a0a0a", // Dark theme
            color: "white",
            padding: "2rem",
            position: "relative",
        }}>
            {/* Left Side: Skill List */}
            <div style={{ flex: 1, paddingLeft: "5rem", maxWidth: "40%" }}>
                <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Top Skills</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {skills.map((skill, i) => (
                        <li key={i} style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                            <strong>{skill.name}</strong>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Side: 3D Sphere with Rotating Icons */}
            <SkillsScene />
        </div>
    );
};

export { Skills };
export default Skills;

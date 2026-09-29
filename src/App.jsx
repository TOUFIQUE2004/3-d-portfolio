import { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes.js";
import { BrowserRouter } from "react-router-dom";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Layout from "./components/Layout.jsx";
import ProfileStats from "./components/ProfileStats.jsx";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Layout>
                    <About />
                    <ProfileStats />
                    <Skills />
                    <Projects />
                    <Contact />
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

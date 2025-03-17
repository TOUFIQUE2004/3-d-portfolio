import { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes.js";
import Navbar from "./components/Navbar.jsx";
import { BrowserRouter } from "react-router-dom";
import Skills from "./components/Skills.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
// ✅ Import Parallax

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <BrowserRouter>
                <Navbar /> {/* ✅ Navbar stays fixed above */}
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;

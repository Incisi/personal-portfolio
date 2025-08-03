import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import TechStack from '../components/TechStack/TechStack';
import Experience from '../components/Experience/Experience';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Projects from '../components/Projects/Projects';
import '../App.css';

function HomePage() {
    return (
        <>
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </>
    )
}

export default HomePage
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Workflow from "@/components/Workflow";
import ParticleBackground from "@/components/ParticleBackground";
import Noise from "@/components/Noise";



export default function Home() {
    return (
        <main className="bg-gradient-to-b from-[#0a0a0a] via-[#11111f] to-[#0a0a0a] min-h-screen relative text-slate-200">
            <Noise />
            <ParticleBackground />
            <ScrollyCanvas>
                <Overlay />
            </ScrollyCanvas>
            <About />
            <Services />
            <Workflow />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
            <Footer />
        </main>
    );
}

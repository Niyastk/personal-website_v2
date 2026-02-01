"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";

const projects = [
    {
        title: "CompBldr",
        category: "AI / FLASK / AWS",
        image: "/images/compbldr.jpeg",
        description: "Developed and deployed a scalable Flask-based API for company resource management. Implemented AI-driven job description generation and title mapping using LangChain and OpenAI. Optimized system performance with Celery and AWS SQS for efficient task handling."
    },
    {
        title: "MiBook",
        category: "DJANGO / FINTECH",
        image: "/images/mibook.jpeg",
        description: "Built a scalable accounting application for SMEs using Django. Integrated Cashfree split payments and designed RESTful APIs for mobile interaction. Optimized database queries with PostgreSQL for seamless financial reporting."
    },
    {
        title: "RAG Chatbots",
        category: "GEN AI / LANGCHAIN",
        image: "/images/rag.jpeg",
        description: "Engineered an AI-Voice Chatbot Platform using OpenAI Whisper and Google Text-to-Speech. Integrated RAG pipelines for resume parsing and data extraction, ensuring accurate and personalized responses."
    },
    {
        title: "IPtrack",
        category: "RUBY ON RAILS",
        image: "/images/iptrack.jpeg",
        description: "Developed a real-time website screenshotting system significantly improving data tracking capabilities. Upgraded legacy systems and implemented enhanced security protocols using latest Ruby tools."
    },
];

export default function Projects() {
    return (
        <section className="relative z-20 py-24 px-6 md:px-20 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl md:text-8xl font-medium mb-24 tracking-tight"
                >
                    Selected Work
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useTransform(
        [xSpring, ySpring],
        ([latestX, latestY]) => `rotateX(${latestX}deg) rotateY(${latestY}deg)`
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(-yPct * 10);
        y.set(xPct * 10);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            style={{
                rotateX: xSpring,
                rotateY: ySpring,
                transformStyle: "preserve-3d",
            }}
            className="group relative h-[500px] w-full rounded-2xl cursor-pointer perspective-1000"
        >
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-blue-500/20">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.image})` }}
                />

                {/* Dark Overlay/Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 transform translate-z-20">
                    <div className="mb-auto flex justify-between items-start w-full translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="text-xs font-mono text-white/50 border border-white/10 px-2 py-1 rounded">{String(index + 1).padStart(2, '0')}</span>
                        <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white/90 font-medium tracking-wide">{project.category}</span>
                    </div>

                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                        <h3 className="text-3xl md:text-5xl text-white font-bold mb-4 leading-tight drop-shadow-lg">{project.title}</h3>
                        <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-md line-clamp-3 group-hover:text-white transition-colors drop-shadow-md">
                            {project.description}
                        </p>
                    </div>

                    {/* Decoration Line */}
                    <div className="w-full h-[1px] bg-white/30 mt-6 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
            </div>
        </motion.div>
    );
}


"use client";

import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Discovery",
        desc: "Understanding the core problem. I dive deep into your requirements to ensure we're solving the right puzzle."
    },
    {
        num: "02",
        title: "Architecture",
        desc: "Designing scalable systems. Choosing the right stack (Python, AWS, Next.js) for performance and future growth."
    },
    {
        num: "03",
        title: "Development",
        desc: "Clean, efficient code. Building robust APIs and interactive frontends with a focus on ease of maintenance."
    },
    {
        num: "04",
        title: "AI Integration",
        desc: "The magic touch. Implementing LLMs, RAG pipelines, and intelligent agents to give your product a competitive edge."
    }
];

export default function Workflow() {
    return (
        <section className="relative z-20 py-32 px-6 md:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-7xl font-bold text-white mb-20 text-center tracking-tighter"
                >
                    My Process
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            {/* Number Circle */}
                            <div className="w-24 h-24 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-8 relative z-10 group-hover:border-blue-500/50 transition-colors duration-500 mx-auto md:mx-0">
                                <span className="text-3xl font-mono text-white/30 group-hover:text-white transition-colors duration-500">{step.num}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">{step.title}</h3>
                            <p className="text-white/60 leading-relaxed text-center md:text-left">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

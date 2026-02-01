"use client";

import { motion } from "framer-motion";

const experiences = [
    {
        role: "Software Engineer",
        company: "Alignminds Technologies",
        period: "04/2022 - Present",
        location: "Kochi, Kerala",
        description: [
            "Developed an AI-powered application utilizing Flask with extraction, recommendation, and content generation capabilities.",
            "Designed and managed robust backend systems using Celery and AWS SQS for efficient message queuing.",
            "Optimized data processing workflows for high-performance AI-driven functionalities.",
            "Collaborated with cross-functional teams to deploy and maintain AI-driven features in production."
        ]
    },
    {
        role: "Junior Software Engineer",
        company: "Brototype",
        period: "2021 - 2022",
        location: "Kochi, Kerala",
        description: [
            "Successfully completed a comprehensive Python and programming course, gaining strong coding skills.",
            "Developed hands-on projects using Python for real-world problem-solving and automation.",
            "Gained expertise in backend development concepts including data structures, APIs, and databases."
        ]
    }
];

export default function Experience() {
    return (
        <section className="relative z-20 py-24 px-6 md:px-20">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white text-5xl md:text-7xl font-medium mb-16 tracking-tight"
                >
                    Experience
                </motion.h2>

                <div className="relative border-l border-white/20 ml-4 md:ml-10 space-y-16">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative pl-8 md:pl-16"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                                <h3 className="text-2xl md:text-3xl text-white font-semibold">{exp.role}</h3>
                                <span className="text-blue-400 font-mono text-sm">{exp.company}</span>
                            </div>

                            <div className="flex items-center gap-4 text-white/50 text-sm font-mono mb-6">
                                <span>{exp.period}</span>
                                <span>•</span>
                                <span>{exp.location}</span>
                            </div>

                            <ul className="space-y-3">
                                {exp.description.map((item, i) => (
                                    <li key={i} className="text-white/70 text-base md:text-lg leading-relaxed flex items-start gap-3">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

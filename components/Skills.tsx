"use client";

import { motion } from "framer-motion";

const skillCategories = [
    {
        title: "Languages",
        skills: ["Python", "JavaScript", "HTML", "CSS"]
    },
    {
        title: "Frameworks",
        skills: ["Flask", "Django", "LangChain", "FastAPI"]
    },
    {
        title: "Tools & Cloud",
        skills: ["AWS SQS", "Celery", "Redis", "Nginx", "Docker", "Git"]
    },
    {
        title: "Databases",
        skills: ["PostgreSQL", "MySQL", "MongoDB"]
    }
];

const interests = [
    "Artificial Intelligence",
    "Generative AI",
    "Backend Scalability",
    "Open Source",
    "Tech Innovation"
];

export default function Skills() {
    return (
        <section className="relative z-20 py-24 px-6 md:px-20 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                {/* Skills Column */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-medium mb-12 tracking-tight"
                    >
                        Technical Skills
                    </motion.h2>

                    <div className="space-y-10">
                        {skillCategories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl text-white/40 font-mono mb-4 border-b border-white/10 pb-2 inline-block">{cat.title}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {cat.skills.map((skill, j) => (
                                        <span
                                            key={j}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Interests Column (Sticky/Fixed look or just simple list) */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-medium mb-12 tracking-tight md:text-right"
                    >
                        Interests
                    </motion.h2>

                    <div className="flex flex-wrap gap-4 md:justify-end">
                        {interests.map((interest, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-900/20 to-purple-900/20 px-6 py-3 border border-white/10"
                            >
                                <span className="relative z-10 text-lg group-hover:text-white transition-colors">{interest}</span>
                                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";
import { SpotlightCard } from "./ui/SpotlightCard";

const services = [
    {
        title: "AI Agents & RAG",
        description: "Building intelligent agents that can reason, search, and answer specific business queries using LangChain and OpenAI.",
        icon: "🤖"
    },
    {
        title: "Scalable APIs",
        description: "Designing high-performance FastApi/Flask backends capable of handling thousands of requests with asynchronous processing.",
        icon: "⚡"
    },
    {
        title: "Full-Stack Web",
        description: "End-to-end application development using Next.js and modern React patterns for seamless user experiences.",
        icon: "🌐"
    },
    {
        title: "Cloud Infrastructure",
        description: "Deploying robust architectures on AWS using SQS, Celery, and Docker for reliability and scale.",
        icon: "☁️"
    }
];

export default function Services() {
    return (
        <section className="relative z-20 py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <TextReveal text="What I Deliver" className="text-4xl md:text-7xl font-bold text-white mb-6 justify-center" />
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-white/50 text-xl max-w-2xl mx-auto"
                    >
                        Turning complex requirements into elegant, functional software.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, i) => (
                        <SpotlightCard key={i} className="p-8 h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl mb-6 bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                                <p className="text-white/60 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    );
}


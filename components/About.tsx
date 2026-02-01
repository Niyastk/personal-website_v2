"use client";

import { motion } from "framer-motion";
import { TextReveal } from "./ui/TextReveal";

export default function About() {
    return (
        <section className="relative z-20 py-32 px-6 md:px-20 overflow-hidden">
            {/* Background decorative blob */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">

                {/* Text Content */}
                <div className="flex-1 space-y-8">
                    <TextReveal text="The Journey" className="text-4xl md:text-6xl font-bold text-white tracking-tight" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-white/70 text-lg md:text-xl leading-relaxed space-y-6"
                    >
                        <p>
                            It started with curiosity and a self-taught Python course. What began as simple automation scripts quickly evolved into a passion for building complex, scalable systems.
                        </p>
                        <p>
                            From leading projects at <span className="text-white font-medium">Alignminds Technologies</span> to exploring the bleeding edge of <span className="text-white font-medium">Generative AI</span>, my career has been defined by one thing:
                            <span className="italic text-white/90"> a relentless drive to solve hard problems.</span>
                        </p>
                        <p>
                            I don't just write code; I design intelligent solutions that bridge the gap between human creativity and machine efficiency.
                        </p>
                    </motion.div>

                    {/* Funny Insight / Stat */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm inline-block"
                    >
                        <p className="text-blue-300 font-mono text-sm mb-1">⚡ Typical Day</p>
                        <p className="text-white font-medium">60% Engineering. 30% Architecture. 10% Wondering why it works.</p>
                    </motion.div>
                </div>

                {/* Visual / Image Placeholder -> Can use a generate_image here if desired, or abstract shape */}
                <div className="flex-1 w-full flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, rotate: 10 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        transition={{ duration: 1 }}
                        className="relative w-72 h-72 md:w-96 md:h-96"
                    >
                        <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-spin-slow" />
                        <div className="absolute inset-4 border border-blue-500/30 rounded-full animate-reverse-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <h3 className="text-6xl font-black text-white/5">CODE</h3>
                                <h3 className="text-6xl font-black text-white/5">CREATE</h3>
                                <h3 className="text-6xl font-black text-white/5">DEPLOY</h3>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

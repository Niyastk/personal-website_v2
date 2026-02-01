"use client";

import { motion } from "framer-motion";

export default function Marquee() {
    return (
        <section className="relative z-20 py-10 bg-white/5 border-y border-white/5 overflow-hidden">
            <div className="flex overflow-hidden whitespace-nowrap">
                <motion.div
                    animate={{ x: [0, -1000] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="flex gap-16 items-center"
                >
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex gap-16 items-center">
                            <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/50">OPEN TO WORK</span>
                            <span className="text-2xl text-blue-500">✷</span>
                            <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/50">PYTHON EXPERT</span>
                            <span className="text-2xl text-purple-500">✷</span>
                            <span className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-white/50">BUILDING THE FUTURE</span>
                            <span className="text-2xl text-blue-500">✷</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

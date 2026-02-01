"use client";

import { motion } from "framer-motion";

export default function Contact() {
    return (
        <section className="relative z-20 py-40 px-6 md:px-20 overflow-hidden flex items-center justify-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#121212] to-black" />

            <div className="relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter"
                >
                    Have an idea?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-white/60 text-xl md:text-2xl mb-12 max-w-2xl mx-auto"
                >
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </motion.p>

                <motion.a
                    href="mailto:niyastk9562@gmail.com"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors"
                >
                    Start a Conversation
                </motion.a>
            </div>
        </section>
    );
}

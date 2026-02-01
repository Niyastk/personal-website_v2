"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Overlay() {
    // Revised scroll ranges to ensure the first section is visible at simple load (0) or very early scroll
    // and stays longer.
    const items = [
        {
            title: "Niyas T K",
            subtitle: "Software Engineer",
            align: "center",
            start: 0,
            end: 0.25
        },
        {
            title: "Python & GenAI",
            subtitle: "Specialist",
            align: "start", // Left side
            start: 0.35,
            end: 0.60
        },
        {
            title: "Scalable Solutions",
            subtitle: "Backend & AI",
            align: "end", // Right side
            start: 0.70,
            end: 0.95
        }
    ];

    return (
        <div className="absolute inset-0 z-10 pointer-events-none">
            {items.map((item, i) => (
                <Section key={i} item={item} />
            ))}
        </div>
    );
}

function Section({ item }: { item: any }) {
    const topPos = `${(item.start + item.end) / 2 * 100}%`;
    const isCaption = item.type === "caption";

    return (
        <motion.div
            initial={{ opacity: 0, y: isCaption ? 10 : 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }}
            viewport={{ margin: "-10%" }}
            className={`absolute w-full px-6 md:px-20 flex flex-col`}
            style={{
                top: topPos,
                alignItems: item.align === 'center' ? 'center' : item.align === 'end' ? 'flex-end' : 'flex-start',
                textAlign: item.align === 'center' ? 'center' : item.align === 'end' ? 'right' : 'left'
            }}
        >
            {isCaption ? (
                // Minimalist Design: No box, just text with shadow
                <p className="text-xl md:text-3xl font-light text-white/90 drop-shadow-md max-w-lg leading-relaxed">
                    <span className="text-blue-400 font-mono text-lg mr-2">&gt;</span>
                    {item.text}
                </p>
            ) : (
                <>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-2 mix-blend-difference">
                        {item.title}
                    </h1>
                    <p className="text-2xl md:text-4xl font-light text-white/80 tracking-wide mix-blend-difference">
                        {item.subtitle}
                    </p>
                </>
            )}
        </motion.div>
    )
}

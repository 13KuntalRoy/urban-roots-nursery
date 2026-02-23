import React from "react";
import { motion } from "framer-motion";

const TreeGrowth = () => {
    return (
        <div className="relative w-full h-[400px] flex items-end justify-center overflow-hidden pointer-events-none opacity-20 lg:opacity-40">
            <svg
                viewBox="0 0 200 200"
                className="w-full h-full max-w-md"
                fill="none"
                stroke="currentColor"
            >
                {/* Trunk */}
                <motion.path
                    d="M100 200 Q100 150 100 100"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-primary"
                />

                {/* Left Branch */}
                <motion.path
                    d="M100 150 Q70 130 50 100"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                    className="text-primary/80"
                />

                {/* Right Branch */}
                <motion.path
                    d="M100 130 Q130 110 150 80"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                    className="text-primary/80"
                />

                {/* Leaves */}
                {[
                    { cx: 50, cy: 100, delay: 2 },
                    { cx: 150, cy: 80, delay: 2.5 },
                    { cx: 100, cy: 100, delay: 2.2 },
                    { cx: 80, cy: 120, delay: 1.8 },
                    { cx: 120, cy: 110, delay: 2.3 },
                    { cx: 70, cy: 80, delay: 2.8 },
                ].map((leaf, i) => (
                    <motion.circle
                        key={i}
                        cx={leaf.cx}
                        cy={leaf.cy}
                        r="6"
                        className="fill-primary"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: leaf.delay, type: "spring" }}
                    />
                ))}

                {/* Little detail paths */}
                <motion.path
                    d="M100 120 L110 115"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-primary/40"
                />
                <motion.path
                    d="M100 160 L90 155"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ delay: 2.7 }}
                    className="text-primary/40"
                />
            </svg>
        </div>
    );
};

export default TreeGrowth;

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

const NatureSounds = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Bird and forest sounds
        audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/2550/2550-preview.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.15;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleSound = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(() => {
                console.log("Browser blocked auto-play. User must interact first.");
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-24 z-50">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleSound}
                        className={`w-12 h-12 rounded-full border-primary/20 bg-background/80 backdrop-blur-md shadow-lg hover:shadow-primary/20 transition-all ${isPlaying ? "text-primary border-primary animate-pulse" : "text-muted-foreground"
                            }`}
                    >
                        {isPlaying ? (
                            <Volume2 className="h-5 w-5" />
                        ) : (
                            <VolumeX className="h-5 w-5" />
                        )}
                        <span className="sr-only">Toggle Nature Sounds</span>
                    </Button>

                    {isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute right-14 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-md border border-primary/20 px-3 py-1.5 rounded-full text-[10px] whitespace-nowrap font-medium text-primary uppercase tracking-widest shadow-sm pointer-events-none"
                        >
                            Nature Mode On
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default NatureSounds;

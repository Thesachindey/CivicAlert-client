import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import SciFiButton from '../../../Components/SciFiButton';

const Banner = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const words = ["City.", "শহর।", "চহৰ।", "শহর।", "شہر।"];

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        const wordTimer = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3500);
        return () => {
            clearTimeout(timer);
            clearInterval(wordTimer);
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.5 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: "blur(12px)" },
        visible: {
            y: 0, opacity: 1, filter: "blur(0px)",
            transition: { type: "spring", stiffness: 40, damping: 25 }
        },
    };

    return (
        <div className="flex items-center justify-center py-5 px-4 md:px-6 relative overflow-hidden">
            
            {/* Background Decorative Glows - Kept the neon green */}
            <div className="absolute top-20 left-1/4 w-48 h-48 md:w-72 md:h-72 bg-[#08cb00]/10 rounded-full blur-[80px] md:blur-[120px] -z-10" />
            <div className="absolute bottom-10 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-[#08cb00]/5 rounded-full blur-[100px] md:blur-[150px] -z-10" />

            {/* --- THEME-AWARE LOADER --- */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        exit={{ opacity: 0, filter: "blur(40px)" }}
                        className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-base-100"
                    >
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "80%", maxWidth: "240px" }}
                            className="h-[1px] bg-[#08cb00] shadow-[0_0_20px_#08cb00]"
                        />
                        <motion.p 
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mt-6 text-[#08cb00] font-mono text-[10px] tracking-[0.8em] uppercase text-center px-4"
                        >
                            System Booting
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- MAIN BANNER SECTION --- */}
            <motion.section 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={!isLoading ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="
                    relative w-full overflow-hidden
                    /* Fixed for Light Mode: bg-base-100/40 and border-base-content/10 */
                    bg-base-100/40 backdrop-blur-[40px] md:backdrop-blur-[60px] 
                    border border-base-content/10 
                    shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_20px_50px_rgba(0,0,0,0.1)]
                    py-12 md:py-20 lg:py-24 px-6 md:px-12 lg:px-24 rounded-[2rem] md:rounded-[3rem] lg:rounded-[4rem]
                "
            >
                <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16 relative z-10">
                    
                    <motion.div 
                        className="flex-1 text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate={!isLoading ? "visible" : "hidden"}
                    >
                        {/* Status Badge */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-base-content/10 text-[#08cb00] text-[10px] font-bold tracking-[0.4em] mb-10 uppercase bg-base-100/50 backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#08cb00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#08cb00]"></span>
                            </span>
                            Sector Status: Optimized
                        </motion.div>

                        {/* Title: Changed text-white to text-base-content */}
                        <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-base-content mb-6 md:mb-8 leading-[1.1] logo-font tracking-tight">
                            Elevate Your <br />
                            <div className="relative inline-block min-h-[1.2em] w-full">
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={words[index]}
                                        initial={{ y: 25, opacity: 0, filter: "blur(12px)" }}
                                        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                        exit={{ y: -25, opacity: 0, filter: "blur(12px)" }}
                                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-x-0 top-0 text-[#08cb00] drop-shadow-[0_0_20px_rgba(8,203,0,0.4)] text-center lg:text-left"
                                    >
                                        {words[index]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </motion.h1>
                        
                        {/* Paragraph: Changed text-white/40 to text-base-content/60 */}
                        <motion.p variants={itemVariants} className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-base-content/60 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
                            Precision-engineered urban reporting. Transform infrastructure concerns into real-time solutions through an immersive digital experience.
                        </motion.p>
                        
                        <motion.div variants={itemVariants} className="flex justify-center lg:justify-start">
                            <SciFiButton name="Report Your Issue" path="/dashboard/report-issue" />
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className="flex-1 w-full max-w-sm md:max-w-md lg:max-w-xl"
                        initial={{ opacity: 0, scale: 1.15, filter: "blur(20px)" }}
                        animate={!isLoading ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                        transition={{ duration: 3, ease: "circOut" }}
                    >
                        <div className="relative group/lottie">
                            <div className="absolute inset-0 bg-[#08cb00]/10 rounded-full blur-[60px] md:blur-[100px] -z-10 animate-pulse" />
                            
                            <DotLottieReact
                                src="https://lottie.host/4a1f9ad7-7587-4fa0-b4ed-746075a70a2f/9gLoh3gzhs.lottie"
                                loop
                                autoplay
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
};

export default Banner;
import React from 'react';
import { CircularProgress } from 'react-loader-spinner';
import { motion } from 'framer-motion';

const LoadingPage = () => {
    return (
        <div className='relative flex justify-center items-center min-h-screen bg-base-100 transition-colors duration-500 overflow-hidden'>
            
            {/* --- BACKGROUND DECORATIVE GLOWS --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-6"
            >
                {/* --- THEME AWARE SPINNER --- */}
                <div className="relative p-8 rounded-[2rem] bg-base-200/50 backdrop-blur-xl border border-base-300 dark:border-white/10 shadow-2xl">
                    <CircularProgress
                        height="80"
                        width="80"
                        color="#08CB00" // Matches your --color-primary
                        ariaLabel="circular-progress-loading"
                        wrapperStyle={{}}
                        wrapperClass="wrapper-class"
                        visible={true}
                        strokeWidth={3}
                        animationDuration={1.5}
                    />
                    
                    {/* Subtle Internal Glow */}
                    <div className="absolute inset-0 bg-primary/5 rounded-[2rem] -z-10" />
                </div>

                {/* Loading Text */}
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-[10px] font-black uppercase tracking-[0.5em] text-primary"
                >
                    Initializing Civic Alert
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoadingPage;
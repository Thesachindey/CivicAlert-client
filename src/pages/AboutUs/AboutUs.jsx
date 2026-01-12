import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutUs() {
    const tabs = ["Story", "Mission", "Impact", "System"];
    const [active, setActive] = React.useState("Story");

    const content = {
        Story: (
            <div className="space-y-6">
                <p className="text-lg leading-relaxed text-base-content/70 font-medium">
                    This platform was created to solve a common problem: public issues often go unnoticed or unresolved 
                    due to a lack of proper reporting and follow-up. Citizens face broken roads, damaged streetlights, 
                    and water leaks every single day.
                </p>
                <p className="text-lg leading-relaxed text-base-content/70 font-medium">
                    Our system provides a <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">simple and transparent</span> way 
                    for citizens to report these issues directly to the responsible authorities, ensuring problems 
                    are documented and tracked properly.
                </p>
            </div>
        ),

        Mission: (
            <p className="text-lg leading-relaxed text-base-content/70 font-medium">
                Our mission is to empower citizens to report public infrastructure issues efficiently. 
                We focus on <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">transparency and accountability</span> 
                by allowing real-time status tracking. Through this system, we aim to bridge the gap between 
                citizens and authorities to support world-class public service management.
            </p>
        ),

        Impact: (
            <p className="text-lg leading-relaxed text-base-content/70 font-medium">
                CivicAlert helps reduce response time by organizing reported issues in a structured, data-driven manner. 
                Authorities can prioritize critical problems based on <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">community upvotes</span>. 
                Over time, this leads to improved infrastructure maintenance and safer public spaces for everyone.
            </p>
        ),

        System: (
            <p className="text-lg leading-relaxed text-base-content/70 font-medium">
                The system is designed with clear <span className="text-primary font-black underline decoration-primary/30 underline-offset-4">role-based access</span>. 
                Citizens report and upvote, while authorized staff review and resolve. The platform emphasizes 
                scalability and security to support a growing number of active citizens building a better city.
            </p>
        ),
    };

    return (
        <div className="relative overflow-hidden py-16 px-4 bg-base-100 transition-colors duration-500 min-h-screen">
            <title>About Us | Civic Alert</title>
            
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto p-8 lg:p-16 rounded-[3.5rem]
                    bg-base-200/80 dark:bg-base-200/40 
                    backdrop-blur-2xl 
                    border-2 border-base-300 dark:border-white/10 shadow-2xl"
            >
                <header className="mb-14 text-left">
                    <h1 className="text-4xl md:text-6xl font-black text-base-content mb-6 tracking-tight">
                        About <span className="text-primary drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Us</span>
                    </h1>
                    <p className="text-base-content/50 max-w-2xl text-base md:text-xl font-bold uppercase tracking-widest leading-relaxed">
                        A digital bridge connecting citizens and authorities to build a smarter, safer, 
                        and more transparent infrastructure.
                    </p>
                </header>

                {/* --- UPDATED TABS: Theme-Aware --- */}
                <div className="flex overflow-x-auto no-scrollbar mb-14 p-2 bg-base-content/5 rounded-[2rem] border border-base-content/5 w-full md:w-fit">
                    <div className="flex flex-nowrap gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActive(tab)}
                                className={`
                                    relative px-8 py-3.5 text-xs md:text-sm font-black uppercase tracking-widest 
                                    transition-all duration-300 rounded-[1.5rem] whitespace-nowrap cursor-pointer
                                    ${active === tab ? "text-primary-content" : "text-base-content/40 hover:text-base-content/80"}
                                `}
                            >
                                <span className="relative z-10">{tab}</span>
                                {active === tab && (
                                    <motion.div
                                        layoutId="activeTabGlider"
                                        className="absolute inset-0 bg-primary shadow-[0_0_25px_rgba(8,203,0,0.4)]"
                                        style={{ borderRadius: '1.5rem' }}
                                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="min-h-[250px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 10, filter: "blur(8px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -10, filter: "blur(8px)" }}
                            transition={{ duration: 0.4 }}
                            className="relative z-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-10 w-1.5 bg-primary rounded-full shadow-[0_0_15px_#08cb00]" />
                                <h3 className="text-3xl font-black text-base-content uppercase tracking-tighter">
                                    Our <span className="text-primary">{active}</span>
                                </h3>
                            </div>
                            <div className="pl-6 md:pl-10 border-l-2 border-base-content/5">
                                {content[active]}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Watermark Logo-font */}
                    <div className="absolute right-0 bottom-0 text-primary/5 select-none pointer-events-none font-black text-[12rem] leading-none hidden lg:block uppercase tracking-tighter">
                        {active.charAt(0)}
                    </div>
                </div>
            </motion.div>

            {/* Hidden Scrollbar Utility */}
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}
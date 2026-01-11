import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutUs() {
    const tabs = ["Story", "Mission", "Impact", "Team & System"];
    const [active, setActive] = React.useState("Story");

    const content = {
        Story: (
            <div className="space-y-6">
                <p className="text-lg leading-relaxed text-white/60 font-light">
                    This platform was created to solve a common problem: public issues often go unnoticed or unresolved 
                    due to a lack of proper reporting and follow-up. Citizens face broken roads, damaged streetlights, 
                    and water leaks every single day.
                </p>
                <p className="text-lg leading-relaxed text-white/60 font-light">
                    Our system provides a <span className="text-[#08cb00] font-bold">simple and transparent</span> way 
                    for citizens to report these issues directly to the responsible authorities, ensuring problems 
                    are documented and tracked properly.
                </p>
            </div>
        ),

        Mission: (
            <p className="text-lg leading-relaxed text-white/60 font-light">
                Our mission is to empower citizens to report public infrastructure issues efficiently. 
                We focus on <span className="text-[#08cb00] font-bold">transparency and accountability</span> 
                by allowing real-time status tracking. Through this system, we aim to bridge the gap between 
                citizens and authorities to support world-class public service management.
            </p>
        ),

        Impact: (
            <p className="text-lg leading-relaxed text-white/60 font-light">
                CivicAlert helps reduce response time by organizing reported issues in a structured, data-driven manner. 
                Authorities can prioritize critical problems based on <span className="text-[#08cb00] font-bold">community upvotes</span>. 
                Over time, this leads to improved infrastructure maintenance and safer public spaces for everyone.
            </p>
        ),

        "Team & System": (
            <p className="text-lg leading-relaxed text-white/60 font-light">
                The system is designed with clear <span className="text-[#08cb00] font-bold">role-based access</span>. 
                Citizens report and upvote, while authorized staff review and resolve. The platform emphasizes 
                scalability and security to support a growing number of active citizens building a better city.
            </p>
        ),
    };

    return (
        <div className="relative overflow-hidden py-10 px-4">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl mx-auto p-8 lg:p-16 bg-white/[0.03] backdrop-blur-[60px] border border-white/10 border-t-white/20 rounded-[3rem] shadow-2xl"
            >
                <header className="mb-12 text-left">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        About <span className="text-[#08cb00] drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Us</span>
                    </h1>
                    <p className="text-white/40 max-w-2xl text-base md:text-lg font-light leading-relaxed">
                        A digital bridge connecting citizens and authorities to build a smarter, safer, 
                        and more transparent infrastructure.
                    </p>
                </header>

                {/* --- UPDATED TABS: Added horizontal scroll & cursor fixes --- */}
                <div className="flex overflow-x-auto no-scrollbar mb-12 p-1.5 bg-white/5 rounded-[2rem] border border-white/5 w-full md:w-fit">
                    <div className="flex flex-nowrap gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActive(tab)}
                                className={`
                                    relative px-6 py-3 text-xs md:text-sm font-black uppercase tracking-widest 
                                    transition-all duration-300 rounded-[1.5rem] whitespace-nowrap cursor-pointer
                                    ${active === tab ? "text-black" : "text-white/40 hover:text-white/80"}
                                `}
                            >
                                <span className="relative z-10">{tab}</span>
                                {active === tab && (
                                    <motion.div
                                        layoutId="activeTabGlider"
                                        className="absolute inset-0 bg-[#08cb00] rounded-[1.5rem] shadow-[0_0_20px_rgba(8,203,0,0.5)]"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* --- CONTENT AREA: Refined Alignment --- */}
                <div className="min-h-[200px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active}
                            initial={{ opacity: 0, x: 10, filter: "blur(5px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: -10, filter: "blur(5px)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-8 w-1 bg-[#08cb00] rounded-full shadow-[0_0_10px_#08cb00]" />
                                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">
                                    {active}
                                </h3>
                            </div>
                            <div className="pl-5 border-l border-white/5">
                                {content[active]}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Faint Watermark Background */}
                    <div className="absolute right-0 bottom-0 text-[#08cb00]/5 select-none pointer-events-none font-black text-9xl hidden md:block">
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
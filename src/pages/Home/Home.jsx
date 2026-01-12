import React, { useState, useEffect } from 'react';
import Banner from './Banner/Banner';
import Features from './Features/Features';
import HowItWorks from './HowItWork/HowItWorks';
import IssueCategoriesAndPriorities from './IssueCategoriesAndPriorities/IssueCategoriesAndPriorities';
import CommunityImpact from './CommunityImpact/CommunityImpact';
import LatestResolvedIssues from './LatestResolvedIssues/LatestResolvedIssues';
import FAQ from './FAQ/FAQ';
import Testimonials from './Testimonials/Testimonials';
import Pricing from './Pricing/Pricing';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const Home = () => {
    const [showButton, setShowButton] = useState(false);

    // Monitoring scroll position to show/hide button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative">
            <title>Civic Alert | Smart Infrastructure Reporting</title>
            <header>
                <Banner />
            </header>
            <main>
                <Features />
                <LatestResolvedIssues />
                <HowItWorks />
                <CommunityImpact />
                <IssueCategoriesAndPriorities />
                <Testimonials />
                <Pricing />
                <FAQ />
            </main>

            {/* --- GO TO TOP BUTTON --- */}
            <AnimatePresence>
                {showButton && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-[99] 
                                   w-14 h-14 rounded-2xl flex items-center justify-center
                                   bg-primary text-white shadow-[0_0_20px_rgba(8,203,0,0.4)]
                                   hover:bg-[#07b500] hover:shadow-[0_0_30px_rgba(8,203,0,0.6)]
                                   transition-all duration-300 group"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp 
                            size={24} 
                            className="group-hover:-translate-y-1 transition-transform duration-300" 
                        />
                        
                        {/* Subtle pulse ring */}
                        <span className="absolute inset-0 rounded-2xl border-2 border-primary animate-ping opacity-20 pointer-events-none"></span>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Home;
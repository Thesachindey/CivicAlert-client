import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import IssueCard from '../../../Components/IssueCard';
import LoadingPage from '../../LoadingPage/LoadingPage';

const LatestResolvedIssues = () => {
    
    const axiosPublic = axios.create({
        baseURL: 'https://civic-alert-server.vercel.app/' 
    });

    const { data: issues = [], isLoading } = useQuery({
        queryKey: ['latest-resolved-issues'],
        queryFn: async () => {
            const res = await axiosPublic.get('/issues?status=Resolved');
            return res.data;
        }
    });

    // --- ANIMATION VARIANTS (Matching Banner/Features) ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 40, damping: 20 }
        },
    };

    if (isLoading) return <LoadingPage />;
    const displayIssues = issues.slice(0, 6);

    return (
        <div className="py-24 relative overflow-hidden">
            {/* Background Decorative Glows */}
            <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#08cb00]/5 rounded-full blur-[150px] -z-10" />
            <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-[#08cb00]/5 rounded-full blur-[120px] -z-10" />

            <div className='container mx-auto px-6 md:px-16 max-w-7xl'>
                
                {/* --- HEADER SECTION --- */}
                <motion.div 
                    className="text-center mb-16 space-y-4"
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <FaCheckCircle className="text-[#08cb00] text-3xl drop-shadow-[0_0_10px_rgba(8,203,0,0.5)]" />
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Latest <span className="text-[#08cb00]">Resolved</span> Issues
                        </h2>
                    </div>
                    <p className="text-white/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                        See how our community and staff are working together to fix public infrastructure problems and build a better city.
                    </p>
                </motion.div>

                {/* --- CONTENT SECTION --- */}
                {displayIssues.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {displayIssues.map((issue) => (
                            <motion.div key={issue._id} variants={itemVariants}>
                                <IssueCard issue={issue} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    /* --- EMPTY STATE (GLASS STYLE) --- */
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="
                            text-center py-20 
                            bg-white/[0.02] backdrop-blur-2xl 
                            border border-white/10 rounded-[3rem]
                            shadow-2xl
                        "
                    >
                        <FaCheckCircle className="mx-auto text-5xl text-white/10 mb-6 animate-pulse" />
                        <h3 className="text-xl font-bold text-white/60 mb-2">No resolved issues yet</h3>
                        <p className="text-white/30 text-sm font-light">
                            The system is active. Once an issue is fixed, it will appear in this emerald sector.
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default LatestResolvedIssues;
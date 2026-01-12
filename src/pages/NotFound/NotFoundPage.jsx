import React from 'react';
import { Link, useNavigate } from 'react-router';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, ShieldQuestion } from 'lucide-react';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-12 px-4 transition-colors duration-500 relative overflow-hidden">
            <title>404 - Lost in Infrastructure | Civic Alert</title>

            {/* Signature Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-2xl rounded-[4rem] 
                    bg-base-200/80 dark:bg-base-200/40 
                    backdrop-blur-2xl 
                    border-2 border-base-300 dark:border-white/10 
                    p-8 md:p-16 text-center shadow-2xl relative"
            >
                {/* Lottie Animation Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-sm mx-auto mb-6"
                >
                    <DotLottieReact
                        src="https://lottie.host/2b65181e-d911-48cf-b7a3-d9c877251ee9/eZZqQJsFCV.lottie"
                        loop
                        autoplay
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-6"
                >
                    <div>
                        <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter uppercase mb-2">
                            Route <span className="text-primary drop-shadow-[0_0_15px_rgba(8,203,0,0.4)]">Not Found</span>
                        </h1>
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-base-content/5 text-base-content/40 text-[10px] font-black uppercase tracking-[0.3em] border border-base-content/10">
                            Error Code: 404 Infrastructure Gap
                        </div>
                    </div>

                    <p className="text-sm md:text-base font-bold text-base-content/60 uppercase tracking-widest leading-relaxed max-w-md mx-auto">
                        This road leads nowhere. Even <span className="text-primary">Civic Alert</span> precision tracking couldn't find this coordinate.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
                        <Link 
                            to="/" 
                            className="btn btn-primary rounded-2xl gap-3 font-black uppercase tracking-widest text-[11px] w-full sm:w-56 h-14 shadow-lg shadow-primary/20 text-white border-none"
                        >
                            <Home size={18} /> Return to Home
                        </Link>

                        <button 
                            onClick={() => navigate(-1)} 
                            className="btn btn-outline border-2 rounded-2xl gap-3 font-black uppercase tracking-widest text-[11px] w-full sm:w-56 h-14"
                        >
                            <ArrowLeft size={18} /> Go Back
                        </button>
                    </div>
                </motion.div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 opacity-5">
                   <ShieldQuestion size={120} />
                </div>
            </motion.div>

            {/* Footer Watermark */}
            <div className="mt-12 flex items-center gap-2 text-base-content/20 font-black uppercase tracking-[0.4em] text-[10px]">
                 Secure Protocol 404 // Civic Alert System
            </div>
        </div>
    );
};

export default NotFoundPage;
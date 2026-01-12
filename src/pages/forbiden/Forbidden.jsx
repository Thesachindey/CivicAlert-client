import { FaLock, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, LogIn } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-12 px-4 transition-colors duration-500 relative overflow-hidden">
      <title>403 - Forbidden | Civic Alert</title>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-error/5 rounded-full blur-[150px] -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg rounded-[3rem] 
          /* LIGHT: Solid light gray | DARK: Deep midnight glass */
          bg-base-200/80 dark:bg-base-200/40 
          backdrop-blur-2xl 
          border-2 border-base-300 dark:border-white/10 
          p-10 md:p-16 text-center"
      >
        {/* Icon with Pulsing Effect */}
        <div className="relative inline-block mb-10">
          <div className="bg-error/10 text-error p-8 rounded-[2.5rem] shadow-lg shadow-error/5">
            <FaLock className="text-6xl" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-error/20 rounded-[2.5rem] -z-10"
          />
        </div>

        {/* Header Section */}
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-error tracking-tighter uppercase">
            Access <span className="text-base-content opacity-90">Denied</span>
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-error/10 text-error text-[10px] font-black uppercase tracking-[0.3em] border border-error/20">
            Error Code: 403 Forbidden
          </div>
        </div>

        {/* Message */}
        <div className="space-y-6 mb-10">
          <p className="text-lg font-black text-base-content leading-tight">
            This sector is restricted to authorized personnel only.
          </p>
          <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest leading-relaxed px-4">
            If you believe this is a system error, please re-authenticate your session or return to the landing hub.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/" 
            className="btn btn-outline border-2 rounded-2xl gap-2 font-black uppercase tracking-widest text-[10px] flex-1 h-14"
          >
            <ArrowLeft size={16} /> Return Home
          </Link>

          <Link 
            to="/login" 
            className="btn btn-primary rounded-2xl gap-2 font-black uppercase tracking-widest text-[10px] flex-1 h-14 shadow-lg shadow-primary/20 text-white"
          >
            <LogIn size={16} /> Re-Authorize
          </Link>
        </div>
      </motion.div>

      {/* Security Footer Watermark */}
      <div className="mt-12 flex items-center gap-2 text-base-content/20 font-black uppercase tracking-[0.4em] text-[10px]">
        <FaShieldAlt /> Secure Protocol Active
      </div>
    </div>
  );
};

export default Forbidden;
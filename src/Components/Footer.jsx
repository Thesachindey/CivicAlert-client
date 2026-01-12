import React from "react";
import { Link } from "react-router";
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer
    className="
    relative w-full overflow-hidden
    bg-base-200 dark:bg-base-100
    backdrop-blur-[60px]
    border-t border-base-300 dark:border-base-content/20
    pt-16 pb-10 px-6
    rounded-t-[3rem]
    transition-colors duration-500
  "
    >
      {/* Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/30 rounded-full blur-[150px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Branding */}
          <div className="md:col-span-5 space-y-8">
            <div  className="flex items-center gap-2 w-fit">
              <Logo />
            </div>

            <p className="text-sm text-base-content/60 max-w-sm leading-relaxed font-light">
              Civic Alert is a high-performance infrastructure reporting platform.
              Empowering citizens to report, track, and resolve city problems with
              total transparency and real-time data.
            </p>

            <div className="space-y-3 text-sm border-l-2 border-primary/30 pl-6 py-1">
              <p className="text-base-content/40 font-black uppercase tracking-tighter text-[10px]">
                Direct Support
              </p>
              <p className="text-base-content/70">support@civicalert.com</p>
              <p className="text-base-content/70 font-mono tracking-tighter">
                +880-1777-000000
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-6">
            <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
              Quick Links
            </h6>
            <ul className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest text-base-content/60">
              <Link className="hover:text-primary transition-all" to="/">Home</Link>
              <Link className="hover:text-primary transition-all" to="/all-issues">All Issues</Link>
              <Link className="hover:text-primary transition-all" to="/dashboard/report-issue">Report Issue</Link>
              <Link className="hover:text-primary transition-all" to="/dashboard">Dashboard</Link>
            </ul>
          </div>

          {/* Resources & Social */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-6">
              <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">
                Resources
              </h6>
              <ul className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest text-base-content/60">
                <Link className="hover:text-primary transition-all" to="/about-us">About Civic Alert</Link>
                <Link className="hover:text-primary transition-all" to={'/privacy-policy'}>Privacy Policy</Link>
                <Link className="hover:text-primary transition-all" to="/terms-conditions">Terms & Conditions</Link>
              </ul>
            </div>


<div className="flex gap-6 items-center text-2xl text-base-content/40">
  {[
    { Icon: FaLinkedin, href: "https://linkedin.com/in/thesachindey" },
    { Icon: FaXTwitter, href: "https://x.com/thesachindey" },
    { Icon: FaFacebook, href: "https://facebook.com/thesachindey" },
  ].map((social, index) => (
    <motion.a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ 
        y: -5, 
        scale: 1.2, 
        color: "var(--color-primary)",
        filter: "drop-shadow(0 0 8px rgba(8, 203, 0, 0.5))"
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="cursor-pointer transition-colors duration-300"
    >
      <social.Icon />
    </motion.a>
  ))}
</div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-base-300 to-transparent my-12" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/50">
          <p>© 2025 Civic Alert. Building better cities together.</p>

          <a
            href="https://github.com/thesachindey"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span>Developed by Sachin</span>
            <Heart size={12} className="text-error" />
            <FaGithub size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}

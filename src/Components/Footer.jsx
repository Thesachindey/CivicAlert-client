import React from "react";
import { Link } from "react-router"; // Ensure this is imported
import { FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaXTwitter, FaGithub } from "react-icons/fa6";
import { Heart } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="relative w-full overflow-hidden bg-white/[0.02] backdrop-blur-[60px] border-t border-white/10 pt-16 pb-10 px-6 rounded-t-4xl">
            
            {/* Background Decorative Glow */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#08cb00]/10 rounded-full blur-[150px] -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Column 1: Branding & Info */}
                    <div className="md:col-span-5 space-y-8">
                        <Link to="/" className="flex items-center gap-2 w-fit">
                            <Logo />
                        </Link>

                        <p className="text-base text-white/40 max-w-sm leading-relaxed font-light">
                            Civic Alert is a high-performance infrastructure reporting platform. 
                            Empowering citizens to report, track, and resolve city problems with 
                            total transparency and real-time data.
                        </p>

                        <div className="space-y-3 text-sm border-l-2 border-[#08cb00]/20 pl-6 py-1">
                            <p className="text-white/20 font-black uppercase tracking-tighter text-[10px]">Direct Support</p>
                            <p className="text-white/60">support@civicalert.com</p>
                            <p className="text-white/60 font-mono tracking-tighter">+880-1777-000000</p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#08cb00] opacity-80">
                            Quick Links
                        </h6>
                        <ul className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
                            <Link to="/" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">Home</Link>
                            <Link to="/all-issues" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">All Issues</Link>
                            <Link to="/dashboard/report-issue" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">Report Issue</Link>
                            <Link to="/dashboard" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">Dashboard</Link>
                        </ul>
                    </div>

                    {/* Column 3: Resources & Socials */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="space-y-6">
                            <h6 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#08cb00] opacity-80">
                                Resources
                            </h6>
                            <ul className="flex flex-col space-y-4 text-xs font-bold uppercase tracking-widest text-white/40">
                                <Link to="/about-us" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">About Civic Alert</Link>
                                <Link to="/how-it-works" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">How It Works</Link>
                                <Link to="/privacy-policy" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">Privacy Policy</Link>
                                <Link to="/terms-conditions" className="cursor-pointer hover:text-[#08cb00] hover:translate-x-2 transition-all duration-300">Terms & Conditions</Link>
                            </ul>
                        </div>

                        <div className="flex gap-5 text-2xl text-white/20">
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                                <FaLinkedin className="cursor-pointer hover:text-[#08cb00] hover:drop-shadow-[0_0_8px_#08cb00] transition-all duration-300" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                <FaXTwitter className="cursor-pointer hover:text-[#08cb00] hover:drop-shadow-[0_0_8px_#08cb00] transition-all duration-300" />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer">
                                <FaFacebook className="cursor-pointer hover:text-[#08cb00] hover:drop-shadow-[0_0_8px_#08cb00] transition-all duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-12" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                    <p>© 2025 Civic Alert. Building better cities together.</p>

                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <a
                            href="https://github.com/thesachindey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 group text-white/40 hover:text-white transition-colors"
                        >
                            <span>Developed by Sachin</span>
                            <Heart size={12} className="text-red-500 group-hover:scale-125 transition-transform" />
                            <FaGithub size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
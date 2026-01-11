import React from 'react';
import { MdOutlineCrisisAlert } from "react-icons/md"
import { Link } from 'react-router';

const Logo = () => {
    return (
        <Link to={'/'} className="group block w-fit">
            <div className="
                logo-font flex items-end relative px-4 py-2 rounded-2xl 
                /* THEME-AWARE GLASS EFFECT */
                bg-base-100/20 backdrop-blur-md 
                border border-base-content/5 group-hover:border-[#08cb00]/30 
                transition-all duration-500
            ">
                {/* Subtle internal glow behind the icon */}
                <div className="absolute inset-0 bg-[#08cb00]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-md" />

                <MdOutlineCrisisAlert 
                    className='text-[#08cb00] font-bold relative z-10 drop-shadow-[0_0_8px_rgba(8,203,0,0.3)]' 
                    size={45} 
                />
                
                {/* FIXED: text-white changed to text-base-content */}
                <h2 className='text-3xl font-extrabold -ms-9 text-base-content relative z-10 tracking-tight'>
                    CivicAlert
                </h2>

                {/* Bottom Specular Highlight */}
                <div className="absolute bottom-0 inset-x-4 h-px bg-gradient-to-r from-transparent via-[#08cb00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </Link>
    );
};

export default Logo;
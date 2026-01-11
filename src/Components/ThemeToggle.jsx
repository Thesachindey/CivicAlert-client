import React, { useEffect, useState } from 'react';
import { RiMoonCloudyFill, RiSunFill } from 'react-icons/ri';

const ThemeToggle = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "dark");

    useEffect(() => {
        const html = document.documentElement;
        
        // 1. Sync DaisyUI
        html.setAttribute("data-theme", theme);
        
        // 2. Sync Tailwind
        if (theme === "dark") {
            html.classList.add("dark");
        } else {
            html.classList.remove("dark");
        }
        
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="flex items-center p-2">
            <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                    checked={theme === "dark"}
                />

                <div className="w-12 h-[20px] rounded-full transition-all duration-300 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-white/10 peer-checked:bg-[#08cb00]/30"></div>

                <div className="absolute left-0 top-[-6px] w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white text-amber-500 shadow-lg border border-slate-200 peer-checked:left-[calc(100%-32px)] peer-checked:bg-[#08cb00] peer-checked:text-white peer-checked:border-none">
                    {theme === "dark" ? <RiMoonCloudyFill size={18} /> : <RiSunFill size={18} />}
                </div>
            </label>
        </div>
    );
};

export default ThemeToggle;
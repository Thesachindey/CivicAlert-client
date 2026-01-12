import React, { useEffect, useState } from 'react';
import { RiMoonCloudyFill, RiSunFill } from 'react-icons/ri';

const ThemeToggle = () => {
    // Initial state from localStorage or default to dark
    const [theme, setTheme] = useState(localStorage.getItem('theme') || "dark");

    const handleTheme = (checked) => {
        const newTheme = checked ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        window.location.reload();
    };

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <div className="flex items-center p-2">
            <label className="relative inline-flex items-center cursor-pointer group">
                <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    onChange={(e) => handleTheme(e.target.checked)}
                    checked={theme === "dark"}
                />

                {/* THE TRACK */}
                <div className="w-12 h-[20px] rounded-full transition-all duration-300 bg-base-300 border border-base-content/10 peer-checked:bg-[#08cb00]/40"></div>

                {/* THE KNOB */}
                <div className="
                    absolute left-0 top-[-6px] w-8 h-8 rounded-full 
                    flex items-center justify-center transition-all duration-300 
                    ease-[cubic-bezier(0.4,0,0.2,1)]
                    bg-white text-amber-500 shadow-lg border border-base-300
                    peer-checked:left-[calc(100%-32px)] peer-checked:bg-[#08cb00] 
                    peer-checked:text-white
                ">
                    {theme === "dark" ? <RiMoonCloudyFill size={18} /> : <RiSunFill size={18} />}
                </div>
            </label>
        </div>
    );
};

export default ThemeToggle;
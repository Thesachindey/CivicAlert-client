import React from 'react';
import { Link } from 'react-router';

const SciFiButton = ({ path, name }) => {
  // --- THEME COLORS ---
  const primaryGreen = "8, 203, 0"; // #08cb00
  const goldGlow = "#fbbf24";      // Amber-400 (Gold)

  const gradientStops = `
    transparent, 
    rgba(${primaryGreen}, 0.2) 20px, 
    rgba(${primaryGreen}, 0.66) 20px, 
    #ffffff, 
    rgba(${primaryGreen}, 0.66) calc(100% - 20px), 
    rgba(${primaryGreen}, 0.2) calc(100% - 20px), 
    transparent
  `;

  return (
    <div className="relative inline-block group">
      {/* 1. SVG FILTER (Invisible) */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <filter id="unopaq" width="3000%" x="-1000%" height="3000%" y="-1000%">
          <feColorMatrix
            values="1 0 0 0 0 
                    0 1 0 0 0 
                    0 0 1 0 0 
                    0 0 0 3 0"
          />
        </filter>
      </svg>

      {/* 2. BACKDROP (Green Scanlines) */}
      <div 
        className="absolute inset-[-20%] -z-10 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_20%,rgba(4,26,0,0.6)_50%)] bg-[size:3px_3px] pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. THE BUTTON */}
      <Link
        to={path || '#'}
        className="
          relative flex items-center justify-center 
          px-8 py-3 min-w-[140px]
          bg-[#020d00] text-white cursor-pointer border-none 
          transition-all duration-300 z-10
          whitespace-nowrap text-sm md:text-base font-medium tracking-widest uppercase
        "
      >
        {/* Hover Pattern (Gold Glow) */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-40 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_20%,#041a00_50%),radial-gradient(ellipse_100%_100%,${goldGlow},transparent)] bg-[size:3px_3px,auto_auto]" />

        {/* 4. GLOWING BORDERS */}
        
        {/* Left Line */}
        <div 
          className="absolute left-[-2px] -top-6 -bottom-6 w-[2px] pointer-events-none"
          style={{ background: `linear-gradient(${gradientStops})` }}
        >
          <div className="absolute inset-0 -z-20 blur-[4px] bg-inherit [filter:url(#unopaq)]" />
          <div 
            className="absolute inset-0 -z-20 blur-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [filter:url(#unopaq)]" 
            style={{ backgroundColor: goldGlow }}
          />
        </div>

        {/* Right Line */}
        <div 
          className="absolute right-[-2px] -top-6 -bottom-6 w-[2px] pointer-events-none"
          style={{ background: `linear-gradient(${gradientStops})` }}
        >
          <div className="absolute inset-0 -z-20 blur-[4px] bg-inherit [filter:url(#unopaq)]" />
          <div 
            className="absolute inset-0 -z-20 blur-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [filter:url(#unopaq)]" 
            style={{ backgroundColor: goldGlow }}
          />
        </div>

        {/* Top Line */}
        <div 
          className="absolute top-[-2px] -left-6 -right-6 h-[2px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${gradientStops})` }}
        >
          <div className="absolute inset-0 -z-20 blur-[4px] bg-inherit [filter:url(#unopaq)]" />
          <div 
            className="absolute inset-0 -z-20 blur-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [filter:url(#unopaq)]" 
            style={{ backgroundColor: goldGlow }}
          />
        </div>

        {/* Bottom Line */}
        <div 
          className="absolute bottom-[-2px] -left-6 -right-6 h-[2px] pointer-events-none"
          style={{ background: `linear-gradient(90deg, ${gradientStops})` }}
        >
          <div className="absolute inset-0 -z-20 blur-[4px] bg-inherit [filter:url(#unopaq)]" />
          <div 
            className="absolute inset-0 -z-20 blur-[10px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 [filter:url(#unopaq)]" 
            style={{ backgroundColor: goldGlow }}
          />
        </div>

        {/* Button Text */}
        <span className="relative z-10 logo-font group-hover:text-amber-100 transition-colors drop-shadow-[0_0_8px_rgba(8,203,0,0.6)]">
          {name}
        </span>
      </Link>
    </div>
  );
};

export default SciFiButton;
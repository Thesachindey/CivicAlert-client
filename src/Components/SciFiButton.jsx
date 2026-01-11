import React from 'react';
import { Link } from 'react-router';

const SciFiButton = ({ path, name }) => {
  // --- EMERALD THEME COLORS ---
  const glowColor = "rgb(8, 203, 0)";
  const glowSpread = "rgba(8, 203, 0, 0.4)";
  const enhancedGlow = "rgb(150, 255, 140)";
  const btnColor = "rgb(2, 13, 0)"; // Deep dark green background

  return (
    <Link
      to={path || '#'}
      className="group relative inline-block"
    >
      <button
        className="
          relative px-10 py-3 text-sm font-bold tracking-widest uppercase
          transition-all duration-300 cursor-pointer outline-none
          rounded-2xl border-[0.25em] z-10
          
          /* BASE COLORS */
          text-[#08cb00] border-[#08cb00] bg-[#020d00]
          
          /* GLOW EFFECTS */
          shadow-[0_0_1em_0.25em_rgba(8,203,0,0.4),0_0_2em_0.5em_rgba(8,203,0,0.2),inset_0_0_0.75em_0.25em_rgba(8,203,0,0.4)]
          [text-shadow:0_0_0.5em_#08cb00]

          /* HOVER STATE */
          hover:text-[#020d00] hover:bg-[#08cb00]
          hover:shadow-[0_0_1em_0.25em_#08cb00,0_0_4em_2em_rgba(8,203,0,0.5),inset_0_0_0.75em_0.25em_#08cb00]
          
          /* ACTIVE STATE */
          active:scale-95 active:shadow-[0_0_0.6em_0.25em_#08cb00,0_0_2.5em_2em_rgba(8,203,0,0.4)]
        "
      >
        {name}

        {/* --- REFLECTION SHADOW (The ::after effect) --- */}
        <div 
          className="
            absolute top-[120%] left-0 w-full h-full pointer-events-none
            bg-[#08cb00] opacity-30 blur-[1.5em]
            transition-opacity duration-300
            group-hover:opacity-60
            [transform:perspective(1.5em)_rotateX(35deg)_scale(1,0.6)]
          "
        />
      </button>
    </Link>
  );
};

export default SciFiButton;
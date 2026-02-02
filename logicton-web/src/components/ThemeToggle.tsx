"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, SunMoon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center backdrop-blur-sm">
        <SunMoon className="w-4 h-4 text-indigo-400" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center hover:from-indigo-500/30 hover:to-purple-500/30 transition-all duration-500 overflow-hidden backdrop-blur-sm group"
      aria-label="Toggle theme"
      style={{
        transform: isHovering ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovering 
          ? theme === "dark" 
            ? "0 0 20px rgba(129, 140, 248, 0.4)" 
            : "0 0 20px rgba(79, 70, 229, 0.3)"
          : "none"
      }}
    >
      {/* Animated background glow */}
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: theme === "dark" 
            ? "radial-gradient(circle at center, rgba(129, 140, 248, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 70%)"
        }}
      />
      
      {/* Icon container with smooth transition */}
      <div className="relative z-10 flex items-center justify-center">
        {theme === "dark" ? (
          <Sun 
            className="w-5 h-5 text-yellow-400 transition-all duration-500"
            style={{
              transform: isHovering ? "rotate(90deg) scale(1.1)" : "rotate(0deg) scale(1)",
              filter: isHovering ? "drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))" : "none"
            }}
          />
        ) : (
          <Moon 
            className="w-5 h-5 text-indigo-600 transition-all duration-500"
            style={{
              transform: isHovering ? "rotate(-90deg) scale(1.1)" : "rotate(0deg) scale(1)",
              filter: isHovering ? "drop-shadow(0 0 8px rgba(79, 70, 229, 0.6))" : "none"
            }}
          />
        )}
      </div>

      {/* Ripple effect on hover */}
      <div 
        className="absolute inset-0 rounded-xl border-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          transform: isHovering ? "scale(1.1)" : "scale(1)"
        }}
      />
    </button>
  );
}

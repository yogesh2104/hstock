"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  borderGradient?: boolean;
  glowIntensity?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
  };
}

export default function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#3b82f6",
  gradientOpacity = 0.6,
  borderGradient = true,
  glowIntensity = 0.3,
  springConfig = { stiffness: 150, damping: 25 },
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Use springs for smoother animations
  const mouseX = useSpring(-gradientSize, springConfig);
  const mouseY = useSpring(-gradientSize, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Mouse position relative to card
      const mouseXPos = e.clientX - rect.left;
      const mouseYPos = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position (subtle 3D effect)
      const rotationX = ((e.clientY - centerY) / rect.height) * -15;
      const rotationY = ((e.clientX - centerX) / rect.width) * 15;
      
      mouseX.set(mouseXPos);
      mouseY.set(mouseYPos);
      rotateX.set(rotationX);
      rotateY.set(rotationY);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
    rotateX.set(0);
    rotateY.set(0);
  }, [mouseX, mouseY, rotateX, rotateY, gradientSize]);

  // Create multiple gradient layers for depth
  const primaryGradient = useMotionTemplate`
    radial-gradient(
      ${gradientSize * 1.2}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}40,
      ${gradientColor}20 40%,
      transparent 70%
    )
  `;

  const secondaryGradient = useMotionTemplate`
    radial-gradient(
      ${gradientSize * 0.8}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}60,
      transparent 60%
    )
  `;

  const borderGradientTemplate = useMotionTemplate`
    radial-gradient(
      ${gradientSize * 0.6}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 70%
    )
  `;

  const glowGradient = useMotionTemplate`
    radial-gradient(
      ${gradientSize * 1.5}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')},
      transparent 50%
    )
  `;

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm",
        "transition-all duration-500 ease-out",
        isHovered && "shadow-2xl",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* Glow effect behind the card */}
      <motion.div
        className="absolute -inset-2 z-0 rounded-xl blur-xl"
        style={{
          background: glowGradient,
          opacity: isHovered ? glowIntensity : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Primary background gradient */}
      <motion.div
        className="absolute inset-0 z-10 rounded-xl"
        style={{
          background: primaryGradient,
          opacity: isHovered ? gradientOpacity : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Secondary gradient for depth */}
      <motion.div
        className="absolute inset-0 z-20 rounded-xl"
        style={{
          background: secondaryGradient,
          opacity: isHovered ? gradientOpacity * 0.7 : 0,
        }}
        transition={{ duration: 0.3, delay: 0.05 }}
      />

      {/* Border gradient */}
      {borderGradient && (
        <motion.div
          className="absolute inset-0 z-30 rounded-xl"
          style={{
            background: `padding-box linear-gradient(to right, transparent, transparent), border-box ${borderGradientTemplate}`,
            border: '1px solid transparent',
            opacity: isHovered ? 0.8 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 z-40 rounded-xl opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* Content */}
      <div className="relative z-50 h-full p-6">
        {children}
      </div>

      {/* Subtle inner shadow for depth */}
      <div className="absolute inset-0 z-60 rounded-xl shadow-inner pointer-events-none" />
    </div>
  );
}
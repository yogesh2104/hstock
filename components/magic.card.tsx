// "use client";

// import { motion, useMotionTemplate, useMotionValue } from "motion/react";
// import React, { useCallback, useEffect, useRef } from "react";

// import { cn } from "@/lib/utils";

// interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
//   gradientSize?: number;
//   gradientColor?: string;
//   gradientOpacity?: number;
//   gradientFrom?: string;
//   gradientTo?: string;
// }

// export default function MagicCard({
//   children,
//   className,
//   gradientSize = 150,
//   gradientColor = "#262626",
//   gradientOpacity = 0.8,
// }: MagicCardProps) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const mouseX = useMotionValue(-gradientSize);
//   const mouseY = useMotionValue(-gradientSize);

//   const handleMouseMove = useCallback(
//     (e: MouseEvent) => {
//       if (cardRef.current) {
//         const { left, top } = cardRef.current.getBoundingClientRect();
//         const clientX = e.clientX;
//         const clientY = e.clientY;
//         mouseX.set(clientX - left);
//         mouseY.set(clientY - top);
//       }
//     },
//     [mouseX, mouseY],
//   );

//   const handleMouseOut = useCallback(
//     (e: MouseEvent) => {
//       if (!e.relatedTarget) {
//         document.removeEventListener("mousemove", handleMouseMove);
//         mouseX.set(-gradientSize);
//         mouseY.set(-gradientSize);
//       }
//     },
//     [handleMouseMove, mouseX, gradientSize, mouseY],
//   );

//   const handleMouseEnter = useCallback(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     mouseX.set(-gradientSize);
//     mouseY.set(-gradientSize);
//   }, [handleMouseMove, mouseX, gradientSize, mouseY]);

//   useEffect(() => {
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseout", handleMouseOut);
//     document.addEventListener("mouseenter", handleMouseEnter);

//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseout", handleMouseOut);
//       document.removeEventListener("mouseenter", handleMouseEnter);
//     };
//   }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

//   useEffect(() => {
//     mouseX.set(-gradientSize);
//     mouseY.set(-gradientSize);
//   }, [gradientSize, mouseX, mouseY]);

//   return (
//     <div
//       ref={cardRef}
//       className={cn("group relative flex p-6 h-full", className)}
//     >
//       <div className="absolute inset-px z-10 rounded-xl" />
//       <div className="relative z-30">{children}</div>
//       <motion.div
//         className="pointer-events-none absolute inset-px z-10 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//         style={{
//           background: useMotionTemplate`
//             radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)
//           `,
//           opacity: gradientOpacity,
//         }}
//       />
      
//     </div>
//   );
// }

"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type React from "react"
import { useCallback, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  children: React.ReactNode
}

export default function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#3b82f6",
  gradientOpacity = 0.3,
  ...props
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cardRef.current) {
        const { left, top } = cardRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }
    },
    [mouseX, mouseY],
  )

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY, gradientSize])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener("mousemove", handleMouseMove)
    card.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      card.removeEventListener("mousemove", handleMouseMove)
      card.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm",
        className,
      )}
      {...props}
    >
      {/* Gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}40, transparent 70%)
          `,
        }}
      />

      {/* Border gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize * 1.2}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}60, transparent 70%)
          `,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}

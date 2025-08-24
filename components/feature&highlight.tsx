"use client"

import { motion } from "framer-motion"
import MagicCard from "./magic.card"
import { siteConfig } from "@/config/site-config"

export default function EnhancedFeatures() {
  return (
    <div className="relative min-h-screen overflow-hidden" id="features"> 
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div
          className="mb-32"
        >
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              What Makes Us <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Exceptional
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Innovative tools designed to transform your creative workflow with unparalleled precision, speed, and
              intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.features.slice(0, 4).map((feature, index) => (
              <div
                key={index}
                className="h-full"
              >
                <MagicCard
                  className="h-full p-8 hover:border-blue-500/30 transition-all duration-500"
                  gradientColor="#3b82f6"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 },
                      }}
                      className="mb-6 w-16 h-16 border rounded-2xl flex items-center justify-center transition-all duration-300"
                    >
                      <div className="transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-4 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="transition-colors duration-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights Section */}
        <div>
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Powerful
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}
                Highlights
              </span>
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Innovative tools designed to transform your creative workflow with unparalleled precision, speed, and
              intelligence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.features.slice(4, 8).map((feature, index) => (
              <div
                key={index}
                className="h-full"
              >
                <MagicCard
                  className="h-full p-8 transition-all duration-500"
                  gradientColor="#8b5cf6"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div
                      className="mb-6 w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300"
                    >
                      <div className="transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-4 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="transition-colors duration-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

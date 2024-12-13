"use client"
import { siteConfig } from '@/config/site-config';
import { motion } from 'framer-motion';

export default function FeaturesAndHighlight() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100 
      }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-card md:container mx-auto md:mt-5 md:rounded-xl py-10 px-4 overflow-hidden" id="features">
      <div className="max-w-7xl text-center">
        {/* Features Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div 
            variants={containerVariants}
            className="space-y-3 mb-12"
          >
            <motion.h4 
              variants={itemVariants}
              className="text-xl font-medium text-blue-300 tracking-wide uppercase"
            >
              Features
            </motion.h4>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              What Makes Us Exceptional
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Innovative tools designed to transform your creative workflow with unparalleled precision and ease
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteConfig.features.slice(0,4).map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className=" border border-blue-900/30 rounded-2xl p-6 shadow-2xl transition-all duration-300 group"
              >
                <div className="mb-6 w-20 h-20 border border-border/10 dark:border-border/60 mx-auto rounded-full flex items-center justify-center">
                  <div className="text-white scale-125 group-hover:scale-150 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={containerVariants}
            className="space-y-3 mb-12"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-3xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
            >
              Powerful Highlights
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Cutting-edge automation tools to elevate your creative process and maximize productivity
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {siteConfig.features.slice(4,8).map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className="border border-purple-900/30 rounded-2xl p-6 shadow-2xl transition-all duration-300 group"
              >
                <div className="mb-6 w-20 h-20 border border-border/10 dark:border-border/60 mx-auto rounded-full flex items-center justify-center">
                  <div className="text-white scale-125 group-hover:scale-150 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// "use client"
// import { siteConfig } from '@/config/site-config';
// import { motion } from 'framer-motion';
// import { useTheme } from 'next-themes';
// import MagicCard from './magic.card';


// export default function FeaturesAndHighlight() {
//   const { theme } = useTheme()
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1, 
//       transition: { 
//         staggerChildren: 0.1,
//         delayChildren: 0.2 
//       } 
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { 
//       y: 0, 
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 100 
//       }
//     },
//     hover: { 
//       scale: 1.05,
//       transition: { duration: 0.3 }
//     }
//   };

//   return (
//     <div className="bg-card md:container mx-auto md:mt-5 md:rounded-xl py-10 px-4 overflow-hidden" id="features">
//       <div className="max-w-7xl text-center">
//         {/* Features Section */}
//         <motion.div 
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="mb-16"
//         >
//           <motion.div 
//             variants={containerVariants}
//             className="space-y-3 mb-12"
//           >
//             <motion.h4 
//               variants={itemVariants}
//               className="text-xl font-medium text-blue-300 tracking-wide uppercase"
//             >
//               Features
//             </motion.h4>
//             <motion.h2 
//               variants={itemVariants}
//               className="text-3xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
//             >
//               What Makes Us Exceptional
//             </motion.h2>
//             <motion.p 
//               variants={itemVariants}
//               className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
//             >
//               Innovative tools designed to transform your creative workflow with unparalleled precision and ease
//             </motion.p>
//           </motion.div>

//           <motion.div 
//             variants={containerVariants}
//             className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {siteConfig.features.slice(0,4).map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 variants={itemVariants}
//                 whileHover="hover"
//                 className=" border dark:border-white rounded-2xl shadow-2xl transition-all duration-300 group"
//               >
//                 <MagicCard >
//                   <>  
//                   <div className="mb-6 w-20 h-20 border dark:border-white mx-auto rounded-full flex items-center justify-center">
//                     <div className="text-white scale-125 group-hover:scale-150 transition-transform duration-300">
//                       {feature.icon}
//                     </div>
//                   </div>
//                   <h3 className="text-2xl font-bold mb-4 text-white transition-colors">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
//                     {feature.description}
//                   </p>
//                   </>
//                 </MagicCard>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Highlights Section */}
//         <motion.div 
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//         >
//           <motion.div 
//             variants={containerVariants}
//             className="space-y-3 mb-12"
//           >
//             <motion.h2 
//               variants={itemVariants}
//               className="text-3xl md:text-5xl font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
//             >
//               Powerful Highlights
//             </motion.h2>
//             <motion.p 
//               variants={itemVariants}
//               className="text-sm md:text-xl text-gray-300 max-w-2xl mx-auto"
//             >
//               Cutting-edge automation tools to elevate your creative process and maximize productivity
//             </motion.p>
//           </motion.div>

//           <motion.div 
//             variants={containerVariants}
//             className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {siteConfig.features.slice(4,8).map((feature, index) => (
//               <motion.div 
//                 key={index}
//                 variants={itemVariants}
//                 whileHover="hover"
//                 className="border dark:border-white rounded-2xl shadow-2xl transition-all duration-300 group"
//               >
//                 <MagicCard >

//                 <div className="mb-6 w-20 h-20 border dark:border-white mx-auto rounded-full flex items-center justify-center">
//                   <div className="text-white scale-125 group-hover:scale-150 transition-transform duration-300">
//                     {feature.icon}
//                   </div>
//                 </div>
//                 <h3 className="text-2xl font-bold mb-4 text-white transition-colors">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-400 group-hover:text-gray-200 transition-colors">
//                   {feature.description}
//                 </p>
//                 </MagicCard>
//               </motion.div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import MagicCard from "./magic.card"
import { Zap, Shield, Rocket, Brain, Sparkles, Target, Layers, Infinity } from "lucide-react"

// Mock site config - replace with your actual config
const siteConfig = {
  features: [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance with cutting-edge technology for instant results and seamless user experience.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security protocols to protect your data with advanced encryption and monitoring.",
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Rapid Deployment",
      description: "Deploy your projects in seconds with our automated CI/CD pipeline and global infrastructure.",
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered",
      description: "Intelligent automation that learns from your workflow to optimize productivity and efficiency.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Smart Analytics",
      description: "Advanced insights and real-time analytics to make data-driven decisions with confidence.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Tools",
      description: "Pixel-perfect design tools with advanced features for professional-grade creative work.",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Connect with your favorite tools and services through our comprehensive API ecosystem.",
    },
    {
      icon: <Infinity className="w-8 h-8" />,
      title: "Unlimited Scale",
      description: "Scale infinitely with our cloud-native architecture designed for enterprise workloads.",
    },
  ],
}

export default function EnhancedFeatures() {
  const { theme } = useTheme()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      y: 40,
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const titleVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
      },
    },
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          {/* Section Header */}
          <motion.div variants={containerVariants} className="text-center mb-20">
            <motion.div
              variants={titleVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300 tracking-wide uppercase">Features</span>
            </motion.div>

            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight"
            >
              What Makes Us
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Exceptional
              </span>
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Innovative tools designed to transform your creative workflow with unparalleled precision, speed, and
              intelligence.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.features.slice(0, 4).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
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
                      className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center group-hover:border-blue-400/50 transition-all duration-300"
                    >
                      <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-100 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
          {/* Section Header */}
          <motion.div variants={containerVariants} className="text-center mb-20">
            <motion.div
              variants={titleVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6"
            >
              <Target className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300 tracking-wide uppercase">Highlights</span>
            </motion.div>

            <motion.h2
              variants={titleVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-200 bg-clip-text text-transparent leading-tight"
            >
              Powerful
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Highlights
              </span>
            </motion.h2>

            <motion.p
              variants={titleVariants}
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Cutting-edge automation tools to elevate your creative process and maximize productivity with intelligent
              workflows.
            </motion.p>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.features.slice(4, 8).map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="h-full"
              >
                <MagicCard
                  className="h-full p-8 hover:border-purple-500/30 transition-all duration-500"
                  gradientColor="#8b5cf6"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: -5,
                        transition: { duration: 0.3 },
                      }}
                      className="mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center group-hover:border-purple-400/50 transition-all duration-300"
                    >
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-100 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

"use client"
import { motion } from 'framer-motion';
import { Award, MapPin, Calendar } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-card rounded-xl py-16 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/api/placeholder/400/400" 
                alt="Dinesh Singh" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <motion.h2 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-4xl font-extrabold text-white"
            >
              About Us
            </motion.h2>
            <p className="text-lg leading-relaxed text-white">
              HStock Albums has been developed by Dinesh Singh, the founder and director of the software, 
              who brings an extraordinary blend of technical expertise and creative design prowess.
            </p>
          </div>

          <div className="space-y-4 text-white">
            <div className="flex items-center space-x-4">
              <Award className=" w-12 h-12" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold">Design Expertise</h3>
                <p className="">
                  Over 25 years of exceptional experience in wedding album designing
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <MapPin className="text-purple-600 w-12 h-12" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold">Location</h3>
                <p className="">
                  HStock Albums Office - Bulandshahr District, Uttar Pradesh, India
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Calendar className="text-green-600 w-12 h-12" strokeWidth={1.5} />
              <div>
                <h3 className="text-xl font-bold ">Mission</h3>
                <p className="">
                  25 years dedicated to delivering quality work and building client trust
                </p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <p className="italic border-l-4 text-white border-blue-500 pl-4">
              "Our commitment is not just about creating albums, but about preserving memories with unparalleled craftsmanship."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;
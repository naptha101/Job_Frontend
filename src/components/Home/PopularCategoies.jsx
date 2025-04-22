import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaAndroid, FaJava, FaRobot, FaCode, FaDatabase, FaPalette, FaCloud } from 'react-icons/fa';

const PopularCategories = () => {
  const categories = [
    { 
      name: "MERN Stack", 
      icon: <FaReact />,
      color: "from-blue-500 to-cyan-400",
      jobs: "2,145"
    },
    { 
      name: "Android", 
      icon: <FaAndroid />,
      color: "from-green-500 to-emerald-400",
      jobs: "1,893"
    },
    { 
      name: "Java Dev", 
      icon: <FaJava />,
      color: "from-red-500 to-orange-400",
      jobs: "1,756"
    },
    { 
      name: "AI", 
      icon: <FaRobot />,
      color: "from-purple-500 to-indigo-400",
      jobs: "2,367"
    },
    { 
      name: "Web Development", 
      icon: <FaCode />,
      color: "from-blue-600 to-indigo-500",
      jobs: "3,421"
    },
    { 
      name: "Data Science", 
      icon: <FaDatabase />,
      color: "from-yellow-500 to-amber-400",
      jobs: "1,934"
    },
    { 
      name: "UI/UX Design", 
      icon: <FaPalette />,
      color: "from-pink-500 to-rose-400",
      jobs: "1,487"
    },
    { 
      name: "Cloud Computing", 
      icon: <FaCloud />,
      color: "from-teal-500 to-cyan-400",
      jobs: "2,045"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-2">
            <span className="px-4 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              Discover Opportunities
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
            Popular Categories
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore top job categories and find your perfect career match from thousands of opportunities
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <div className="h-full relative overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Decorative Background Element */}
                <div className={`absolute right-0 top-0 w-24 h-24 rounded-bl-full bg-gradient-to-br ${category.color} opacity-20 transition-all duration-300 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:opacity-30`}></div>
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  {/* Icon Section */}
                  <div className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                    <span className="text-2xl">
                      {category.icon}
                    </span>
                  </div>
                  
                  {/* Text Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-500 text-sm mb-4">
                    {category.jobs} open positions
                  </p>
                  
                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                      Browse Jobs
                    </span>
                    
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularCategories;
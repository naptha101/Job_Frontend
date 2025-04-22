import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { FaUserPlus, FaBriefcase, FaClipboardCheck } from 'react-icons/fa';

const HowItWork = () => {
  const steps = [
    {
      title: "Create Account",
      description: "Sign up and complete your professional profile to get started",
      image: "https://th.bing.com/th/id/OIP.fc4X97l7oBh-Fxm9_EsC9gHaE8?w=261&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      icon: <FaUserPlus className="text-blue-600" size={28} />,
      color: "from-blue-50 to-indigo-100",
      accent: "bg-blue-600"
    },
    {
      title: "Find/Post a Job",
      description: "Search for opportunities or create job listings as an employer",
      image: "https://th.bing.com/th/id/OIP.0MRWUraGqsxyzz1K3S7R7QHaE8?w=250&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      icon: <FaBriefcase className="text-purple-600" size={28} />,
      color: "from-purple-50 to-fuchsia-100",
      accent: "bg-purple-600"
    },
    {
      title: "Apply on Jobs or Check Applicants",
      description: "Submit applications or review candidates for your positions",
      image: "https://th.bing.com/th/id/R.82e740d011c5e0e0a5c352b55a1239a9?rik=U7Ii1MOadnBllw&pid=ImgRaw&r=0",
      icon: <FaClipboardCheck className="text-teal-600" size={28} />,
      color: "from-teal-50 to-emerald-100",
      accent: "bg-teal-600"
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="inline-block text-4xl font-bold text-gray-800 font-serif mb-3 relative">
            How Job Ease Works
            <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform translate-y-2"></div>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mt-4">
            Our platform makes it easy to connect job seekers with employers in just three simple steps
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-teal-200 transform -translate-y-20 z-0"></div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                variants={item}
                whileHover={{ y: -8 }}
                className="relative"
              >
                {/* Step Card */}
                <div className={`h-full bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100`}>
                  {/* Card Content */}
                  <div className="flex flex-col h-full">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-30 group-hover:opacity-0 transition-opacity duration-300`}></div>
                      <img 
                        src={step.image} 
                        alt={step.title} 
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" 
                      />
                      {/* Step Number */}
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-800 font-bold">
                        {index + 1}
                      </div>
                      {/* Decorative Pattern */}
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="flex-grow p-6">
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl ${step.color}`}>
                          {step.icon}
                        </div>
                        <h3 className="ml-3 text-xl font-bold text-gray-800">{step.title}</h3>
                      </div>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Bottom Action */}
                    <div className={`px-6 py-4 border-t border-gray-100`}>
                      <button className="flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group">
                        Learn more 
                        <HiOutlineArrowNarrowRight className="ml-2 transition-transform duration-300 transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Connection Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-20 z-20">
                    <div className={`${step.accent} p-2 rounded-full text-white`}>
                      <HiOutlineArrowNarrowRight size={20} />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 transform hover:-translate-y-1">
            Get Started Today
          </button>
          <p className="mt-4 text-gray-500 text-sm">
            Join thousands of professionals finding their ideal jobs
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWork;
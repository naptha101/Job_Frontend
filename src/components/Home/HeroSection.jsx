import React, { useState, useEffect, useRef } from 'react';
import { IoPersonAddOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaComputer } from 'react-icons/fa6';
import { FaBuilding, FaSearch, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideRef = useRef(null);
  
  const images = [
    {
      url: 'https://th.bing.com/th/id/R.2360e416407aef3b0397fd0ee0c21c8a?rik=pXzMCSPTLwqi3g&pid=ImgRaw&r=0',
      description: 'Find jobs that match your passion',
      color: 'from-purple-600 to-indigo-700'
    },
    {
      url: 'https://th.bing.com/th/id/R.26b17d0098061fc5be59b940f5580d06?rik=L6FztQsOUX0gmQ&pid=ImgRaw&r=0',
      description: 'Discover exciting opportunities',
      color: 'from-blue-600 to-cyan-400'
    },
    {
      url: 'https://th.bing.com/th/id/OIP.ipRR3nz9hJVt4mO_8UInQgHaEK?w=305&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      description: 'Shape your future career path',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      url:'https://th.bing.com/th/id/OIP.C3kwCt4Ks59Cckve-eHqnwHaE8?w=245&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7',
      description: "Find your dream salary & apply instantly",
      color: 'from-rose-500 to-pink-600'
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    
    // Automatically advance to the next image
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length, isHovered]);
  
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Quote with author data
  const quotes = [
    {
      text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs"
    },
    {
      text: "Choose a job you love, and you will never have to work a day in your life.",
      author: "Confucius"
    },
    {
      text: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
      author: "Steve Jobs"
    },
    {
      text: "The future depends on what you do today.",
      author: "Mahatma Gandhi"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  // Stats for counters
  const stats = [
    { icon: <CgProfile size={30} />, count: '3,500+', label: 'Employers', color: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { icon: <FaBuilding size={30} />, count: '1,200+', label: 'Companies', color: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { icon: <FaComputer size={30} />, count: '12,000+', label: 'Jobs', color: 'bg-gradient-to-br from-amber-500 to-orange-600' },
    { icon: <IoPersonAddOutline size={30} />, count: '15,000+', label: 'Job Seekers', color: 'bg-gradient-to-br from-emerald-500 to-teal-600' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Main Section */}
      <section className="mt-8 px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-r from-blue-900 to-indigo-900">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500 rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/3"></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-stretch overflow-hidden">
            {/* Content Column */}
            <div className="w-full md:w-2/5 p-6 md:p-12 flex flex-col justify-center">
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-white"
              >
                <motion.div 
                  variants={itemVariants}
                  className="inline-block px-4 py-1 mb-6 rounded-full bg-white bg-opacity-20 text-white text-sm font-medium backdrop-blur-sm"
                >
                  Find your perfect career path
                </motion.div>
                
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
                >
                  {images[currentIndex].description}
                </motion.h1>
                
                <motion.div 
                  variants={itemVariants}
                  className="mb-8"
                >
                  <div className="relative p-4 md:p-6 rounded-xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
                    <FaStar className="text-yellow-300 absolute top-3 left-3" size={16} />
                    <p className="text-white pl-5 italic text-lg md:text-xl">
                      {quotes[currentIndex].text}
                    </p>
                    <p className="text-right text-blue-200 mt-2 font-medium">
                      — {quotes[currentIndex].author}
                    </p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="flex gap-4"
                >
                  <button className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1">
                    Find Jobs
                  </button>
                  <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300">
                    Learn More
                  </button>
                </motion.div>
              </motion.div>
              
              {/* Slide Navigation */}
              <div className="flex justify-center md:justify-start mt-8 gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'bg-white w-8' : 'bg-white/40'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Image Column */}
            <div 
              className="w-full md:w-3/5 h-64 md:h-auto relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              ref={slideRef}
            >
              {/* Animated Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${images[currentIndex].color} opacity-30 mix-blend-overlay`}></div>
              
              {/* Image with Parallax Effect */}
              <div className="absolute inset-0 overflow-hidden">
                {images.map((image, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      currentIndex === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.description}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-5000"
                    />
                  </div>
                ))}
              </div>
              
              {/* Decorative Search Bar Overlay */}
              <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2 w-4/5 max-w-md">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-xl p-2 flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full ml-2">
                    <FaSearch className="text-blue-800" />
                  </div>
                  <div className="flex-1 px-4 font-medium text-gray-500 text-sm md:text-base">
                    Search for your dream job...
                  </div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm md:text-base font-medium rounded-full">
                    Search Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section 
        className="py-12 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`${stat.color} rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="p-6 text-white flex flex-col items-center text-center">
                  <div className="mb-4 bg-white bg-opacity-20 p-4 rounded-full group-hover:scale-110 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-1 group-hover:tracking-wider transition-all duration-300">
                    {stat.count}
                  </h3>
                  <p className="text-white text-opacity-80 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      {/* Featured Categories - Optional Addition */}
      <motion.section 
        className="pb-20 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Popular Job Categories</h2>
            <p className="text-gray-600 mt-2">Explore opportunities in top sectors</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Technology', 'Finance', 'Healthcare', 'Education', 'Marketing', 'Design'].map((category, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-md hover:shadow-lg p-6 text-center cursor-pointer border border-gray-200 hover:border-blue-200 transition-all duration-300"
                whileHover={{ y: -5, backgroundColor: '#f0f9ff' }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
              >
                <div className="mb-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  {index % 6 === 0 && <FaComputer />}
                  {index % 6 === 1 && <FaBuilding />}
                  {index % 6 === 2 && <IoPersonAddOutline />}
                  {index % 6 === 3 && <CgProfile />}
                  {index % 6 === 4 && <FaSearch />}
                  {index % 6 === 5 && <FaStar />}
                </div>
                <h3 className="font-medium text-gray-800">{category}</h3>
                <p className="text-sm text-blue-600 mt-1">View Jobs</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HeroSection;
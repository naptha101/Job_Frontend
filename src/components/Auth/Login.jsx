import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { motion } from 'framer-motion'; // You'll need to install this package

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { SetAuthorized, SetUser, isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) {
      toast.error("All fields are required");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}api/auth/login/`, 
        { email, password, role }, 
        { withCredentials: true }
      );

      if (response.data.status) {
        SetAuthorized(true);
        SetUser(response.data.existingUser);
        localStorage.setItem("user", JSON.stringify(response.data.existingUser));
        toast.success("Welcome back!");
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleForgot = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}api/auth/forgotpassword`, 
        { email }, 
        { withCredentials: true }
      );
      if (response.data.status) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Error sending password reset link");
    } finally {
      setIsLoading(false);
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.8
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Left side - Form */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 flex items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.div
              variants={itemVariants} 
              className="w-full mb-8 text-center"
            >
              <h1 className="text-4xl font-bold text-indigo-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to access your account</p>
            </motion.div>
            
            <motion.form 
              variants={containerVariants}
              className="w-full bg-white rounded-2xl shadow-xl p-8 border border-purple-100"
              onSubmit={handleLogin}
            >
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input 
                  id="email"
                  type="email" 
                  placeholder="you@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  id="password"
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                />
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="role">
                  Select Role
                </label>
                <select 
                  id="role"
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all duration-200"
                  required
                >
                  <option value="">Choose your role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job seeker">Job Seeker</option>
                  <option value="Expert">Expert</option>
                </select>
              </motion.div>
              
              <motion.button 
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </motion.button>
            </motion.form>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 text-sm text-gray-600"
            >
              <Link to="/register" className="hover:text-indigo-700 mb-3 sm:mb-0 transition-colors duration-200">
                New user? <span className="font-semibold text-indigo-600">Create an account</span>
              </Link>
              <button 
                onClick={handleForgot} 
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
              >
                Forgot password?
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Right side - Decorative */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full md:w-1/2 hidden md:flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-12"
      >
        <div className="max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            {/* Abstract shapes */}
            <motion.div 
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
              className="absolute -top-16 -left-16 w-32 h-32 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            <motion.div 
              animate={{ 
                rotate: [0, -10, 0, 10, 0],
                scale: [1, 1.05, 1, 1.05, 1], 
              }}
              transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
              className="absolute -bottom-16 -right-16 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            <motion.div 
              animate={{ 
                rotate: [0, 15, 0, -15, 0],
                scale: [1, 1.05, 1, 1.05, 1],
              }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute top-20 right-20 w-28 h-28 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"
            />
            
            {/* Content */}
            <div className="relative z-10 text-white">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-5xl font-bold mb-6 leading-tight"
              >
                Start your journey with us
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl mb-8 text-indigo-100"
              >
                Connect with opportunities that match your skills and aspirations.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {/* Features */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    "Find dream jobs", 
                    "Connect with experts", 
                    "Build your network", 
                    "Grow your career"
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center"
                    >
                      <div className="mr-3 bg-white bg-opacity-20 rounded-full p-1">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
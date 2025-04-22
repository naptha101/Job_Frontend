import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import { motion } from 'framer-motion'; // You'll need to install this package

const Register = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  const { SetAuthorized, SetUser, isAuthorized } = useContext(Context);
  const navigate = useNavigate();
  
  // Redirect if already authorized
  useEffect(() => {
    if (isAuthorized) {
      navigate('/');
    }
  }, [isAuthorized, navigate]);
  
  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  // Form validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    
    if (!username) newErrors.username = "Username is required";
    else if (username.length < 3) newErrors.username = "Username must be at least 3 characters";
    
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone must be 10 digits";
    
    if (!role) newErrors.role = "Please select a role";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);
      form.append("username", username);
      form.append("role", role);
      form.append("phone", phone);
      
      if (image) {
        form.append("profile", image);
      }
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACK_URL}api/auth/register/`,
        form
      );
      
      if (response.data.status) {
        toast.success(response.data.message || "Registration successful! Please login.");
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(response.data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="md:flex">
            {/* Left panel - decorative */}
            <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 p-12 text-white">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
                  <p className="text-lg text-blue-100 mb-8">Create an account to access personalized job opportunities and connect with industry experts.</p>
                  
                  <div className="space-y-4 mt-8">
                    {["Find your dream job", "Connect with employers", "Get expert advice", "Build your professional network"].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                        className="flex items-center"
                      >
                        <div className="bg-white bg-opacity-20 rounded-full p-1 mr-3">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8">
                  <p className="text-blue-100">Already have an account?</p>
                  <Link to="/login" className="block mt-2 text-white font-semibold hover:text-blue-200 transition-colors duration-200">
                    Sign in →
                  </Link>
                </div>
              </motion.div>
            </div>
            
            {/* Right panel - form */}
            <div className="md:w-1/2 p-8">
              <div className="text-center mb-8">
                <motion.div 
                  variants={itemVariants}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4"
                >
                  <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800">Create an Account</motion.h2>
                <motion.p variants={itemVariants} className="text-gray-500 mt-2">Fill in your details to get started</motion.p>
              </div>
              
              <motion.form 
                variants={containerVariants}
                onSubmit={handleRegister} 
                className="space-y-6"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="1234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">Select Role</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job seeker">Job Seeker</option>
                    <option value="Expert">Expert</option>
                  </select>
                  {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
                  <div className="mt-2 flex items-center">
                    <div className="mr-4">
                      {imagePreview ? (
                        <div className="h-16 w-16 rounded-full overflow-hidden">
                          <img 
                            src={imagePreview} 
                            alt="Profile preview" 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <svg className="h-8 w-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                      <span>Upload photo</span>
                      <input 
                        type="file" 
                        className="sr-only" 
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">JPG, PNG or GIF (Max. 2MB)</p>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </span>
                    ) : "Register Now"}
                  </motion.button>
                </motion.div>
                
                <motion.div variants={itemVariants} className="text-center text-sm mt-4">
                  <span className="text-gray-600">Already have an account?</span>
                  <Link to="/login" className="ml-1 font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200">
                    Sign in instead
                  </Link>
                </motion.div>
              </motion.form>
            </div>
          </div>
        </motion.div>
        
        {/* Mobile only section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="md:hidden text-center mt-8"
        >
          <p className="text-gray-600">Already have an account?</p>
          <Link to="/login" className="mt-2 inline-block font-medium text-indigo-600 hover:text-indigo-500">
            Sign in instead
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
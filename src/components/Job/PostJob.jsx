import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdOutlinePersonSearch, MdBusinessCenter, MdLocationOn } from "react-icons/md";
import { FaDollarSign, FaBuilding } from "react-icons/fa";
import toast from 'react-hot-toast';

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [fixedSalary, setFixedSalary] = useState(0);
  const [salaryFrom, setSalaryFrom] = useState(0);
  const [salaryTo, setSalaryTo] = useState(0);
  const { isAuthorized, SetNav } = useContext(Context);
  const navigate = useNavigate();
  const [isFixed, setFixed] = useState("default");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
    SetNav("PostJob");
  }, []);

  const post = async (e) => {
    e.preventDefault();
    try {
      let pot = null;
      if (isFixed === 'fixed') {
        pot = await axios.post(
          `${import.meta.env.VITE_BACK_URL}api/jobs/post`, 
          { title, category, description, country, city, fixedSalary, location }, 
          { withCredentials: true }
        );
      } else {
        pot = await axios.post(
          `${import.meta.env.VITE_BACK_URL}api/jobs/post`, 
          { title, category, description, country, city, salaryFrom, salaryTo, location }, 
          { withCredentials: true }
        );
      }
      
      if (pot.data.status) {
        toast.success("Job Posted Successfully!");
        // Reset form fields after successful submission
        setTitle("");
        setDescription("");
        setCategory("");
        setCountry("");
        setCity("");
        setLocation("");
        setFixedSalary(0);
        setSalaryFrom(0);
        setSalaryTo(0);
        setFixed("default");
      } else {
        toast.error("Failed to post job");
      }
    } catch (err) {
      toast.error("An error occurred while posting the job");
      console.log(err);
    }
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="container mx-auto py-12 px-4 md:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5">
              <h1 className="text-3xl font-bold text-white flex items-center">
                <MdBusinessCenter className="mr-3" /> Post a New Job
              </h1>
              <p className="text-blue-100 mt-1">Fill in the details to create your job listing</p>
            </div>
            
            <form onSubmit={post} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Job Title</label>
                <input 
                  type="text" 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  placeholder="e.g. Senior Web Developer" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Job Description</label>
                <textarea 
                  onChange={(e) => setDescription(e.target.value)} 
                  value={description} 
                  placeholder="Describe job responsibilities, requirements, benefits..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-32 transition-all"
                  required
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <div className="relative">
                    <FaBuilding className="absolute top-3.5 left-3 text-gray-400" />
                    <input 
                      type="text" 
                      onChange={(e) => setCategory(e.target.value)} 
                      value={category} 
                      placeholder="e.g. IT, Finance, Marketing" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Country</label>
                  <div className="relative">
                    <MdLocationOn className="absolute top-3.5 left-3 text-gray-400" />
                    <select 
                      onChange={(e) => { setCountry(e.target.value) }} 
                      value={country}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      required
                    >
                      <option value="">Select a Country</option>
                      {countries.sort((a, b) => a.name.common.localeCompare(b.name.common)).map(country => (
                        <option key={country.cca2} value={country.name.common}>
                          {country.name.common}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input 
                    type="text" 
                    onChange={(e) => setCity(e.target.value)} 
                    value={city} 
                    placeholder="e.g. New York" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Address</label>
                  <input 
                    type="text" 
                    onChange={(e) => setLocation(e.target.value)} 
                    value={location} 
                    placeholder="Specific location or Remote" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Salary Information</label>
                <select 
                  onChange={(e) => { setFixed(e.target.value) }} 
                  value={isFixed}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  required
                >
                  <option value="default">Choose Salary Type</option>
                  <option value="fixed">Fixed Salary</option>
                  <option value="variable">Salary Range</option>
                </select>
                
                {isFixed === 'fixed' && (
                  <div className="relative">
                    <FaDollarSign className="absolute top-3.5 left-3 text-gray-400" />
                    <input 
                      type='number' 
                      onChange={(e) => setFixedSalary(e.target.value)} 
                      value={fixedSalary} 
                      placeholder="Enter Fixed Salary Amount" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                      required
                    />
                  </div>
                )}
                
                {isFixed === 'variable' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <FaDollarSign className="absolute top-3.5 left-3 text-gray-400" />
                      <input 
                        type='number' 
                        onChange={(e) => setSalaryFrom(e.target.value)} 
                        value={salaryFrom} 
                        placeholder="Salary From" 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        required
                      />
                    </div>
                    <div className="relative">
                      <FaDollarSign className="absolute top-3.5 left-3 text-gray-400" />
                      <input 
                        type='number' 
                        onChange={(e) => setSalaryTo(e.target.value)} 
                        value={salaryTo} 
                        placeholder="Salary To" 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" 
                        required
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type='submit'
                className='w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all'
              >
                Post Job Now
              </motion.button>
            </form>
          </motion.div>
          
          {/* Info/Banner Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-indigo-600 to-blue-800 rounded-2xl shadow-xl overflow-hidden flex flex-col justify-center p-8 text-white"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center mb-8"
            >
              <MdOutlinePersonSearch className="mx-auto text-blue-200" size={100} />
            </motion.div>
            
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-center"
            >
              Find the Perfect <span className="text-blue-200">Talent</span> for Your Team
            </motion.h2>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-lg text-blue-100 text-center mb-8"
            >
              Post your job listing today and connect with qualified candidates who are ready to contribute to your company's success.
            </motion.p>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-4">Why post with us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Access to thousands of qualified professionals</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Smart matching algorithm to find the best candidates</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Detailed analytics on job performance and reach</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-500 rounded-full p-1 mr-3 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <span>Streamlined application management tools</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default PostJob;
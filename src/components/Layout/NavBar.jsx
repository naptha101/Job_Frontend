import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import userImg from '../../assets/userImg.png';
import { MdMapsHomeWork, MdWork, MdClose } from "react-icons/md";
import { FiChevronDown, FiUser, FiHelpCircle, FiLogOut, FiMenu } from "react-icons/fi";

const NavBar = () => {
  const navigate = useNavigate();
  const { isAuthorized, SetAuthorized, user, SetUser, nav } = useContext(Context);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACK_URL}api/auth/logout`, { withCredentials: true });
      if (res) {
        SetAuthorized(false);
        SetUser({});
        toast.success(res.data.message);
        localStorage.removeItem("user");
        navigate('/login');
      }
    } catch (err) {
      navigate('/login');
      toast.error(err.message);
    }
  };

  // Nav link component with active state styling
  const NavLink = ({ to, label, active }) => (
    <Link
      to={to}
      onClick={() => {
        setShowMobileMenu(false);
        setShowUserDropdown(false);
      }}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-md hover:text-white ${
        active ? "text-white" : "text-blue-100"
      }`}
    >
      {label}
      {active && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-full mx-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </Link>
  );

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-blue-800 shadow-lg py-2" 
            : "bg-gradient-to-r from-blue-700 to-blue-600 py-3"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <motion.div
                whileHover={{ rotate: 10 }}
                className="bg-white p-2 rounded-full shadow-md"
              >
                <MdMapsHomeWork className="text-blue-700 text-xl" />
              </motion.div>
              <h1 className="text-white font-bold text-xl font-serif tracking-wide group-hover:tracking-wider transition-all duration-300">
                Job<span className="font-light">Ease</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
      
              <nav className="hidden md:flex items-center space-x-1">
                <NavLink to="/" label="Home" active={nav === 'Home'} />
                
                {user.role === 'Job seeker' && (
                  <NavLink to="/expert/all" label="Experts" active={nav === 'Expert'} />
                )}
                
                <NavLink to="/job/getall" label="Jobs" active={nav === 'Job'} />
                
              {  isAuthorized&&<NavLink 
                  to="/application/me" 
                  label={user.role === 'Employer' ? "Applications" : "My Applications"} 
                  active={nav === 'Employer' || nav === "Applicant's Application"}
                />}
                
                {isAuthorized&&user.role === 'Employer' && (
                  <>
                    <NavLink to="/job/post" label="Post Job" active={nav === 'PostJob'} />
                    <NavLink to="/job/my" label="My Jobs" active={nav === 'MyJob'} />
                  </>
                )}
                
                <NavLink to="/contact" label="Help" active={nav === 'contact'} />
                {
                  !isAuthorized&&
                  <NavLink to={"/login"} label='login' active={nav==='login'}></NavLink>
                }
              </nav>
          

            {/* User Menu (Desktop) */}
            {isAuthorized && (
              <div className="hidden md:flex items-center gap-6">
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 bg-blue-900 bg-opacity-40 hover:bg-opacity-60 rounded-full pl-3 pr-2 py-1 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src={user.profileSet ? user.profile.url : userImg} 
                        alt="User" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <FiChevronDown className={`text-white transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-50"
                      >
                        <button 
                          onClick={() => {
                            navigate('/profile/' + user._id);
                            setShowUserDropdown(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <FiUser className="mr-2" />
                          Profile
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <FiLogOut className="mr-2" />
                          Log Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isAuthorized && (
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden text-white p-2"
              >
                {showMobileMenu ? (
                  <MdClose className="text-2xl" />
                ) : (
                  <FiMenu className="text-2xl" />
                )}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && isAuthorized && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[56px] left-0 right-0 bg-blue-900 shadow-xl z-40 overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-6 p-3 bg-blue-800 rounded-lg">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
                  <img 
                    src={user.profileSet ? user.profile.url : userImg} 
                    alt="User" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <p className="text-white font-medium">{user.firstName || 'User'}</p>
                  <p className="text-blue-200 text-sm">{user.role}</p>
                </div>
              </div>

              <nav className="flex flex-col">
                <MobileNavLink to="/" label="Home" icon={<MdMapsHomeWork />} active={nav === 'Home'} />
                
                {user.role === 'Job seeker' && (
                  <MobileNavLink to="/expert/all" label="Experts" icon={<FiUser />} active={nav === 'Expert'} />
                )}
                
                <MobileNavLink to="/job/getall" label="Jobs" icon={<MdWork />} active={nav === 'Job'} />
                
                <MobileNavLink 
                  to="/application/me" 
                  label={user.role === 'Employer' ? "Applications" : "My Applications"} 
                  icon={<FiUser />}
                  active={nav === 'Employer' || nav === "Applicant's Application"}
                />
                
                {user.role === 'Employer' && (
                  <>
                    <MobileNavLink to="/job/post" label="Post Job" icon={<MdWork />} active={nav === 'PostJob'} />
                    <MobileNavLink to="/job/my" label="My Jobs" icon={<MdWork />} active={nav === 'MyJob'} />
                  </>
                )}
                
                <MobileNavLink to="/contact" label="Help" icon={<FiHelpCircle />} active={nav === 'contact'} />
                
                <button 
                  onClick={() => {
                    navigate('/profile/' + user._id);
                    setShowMobileMenu(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-blue-800 rounded-md mt-2"
                >
                  <FiUser />
                  My Profile
                </button>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-blue-800 rounded-md"
                >
                  <FiLogOut />
                  Log Out
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under navbar */}
      <div className={`${isScrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, label, icon, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-md mb-1 ${
      active 
        ? "bg-blue-700 text-white" 
        : "text-blue-100 hover:bg-blue-800"
    }`}
  >
    {icon}
    {label}
  </Link>
);

export default NavBar;
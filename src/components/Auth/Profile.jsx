import React, { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../../main';
import userImg from '../../assets/userImg.png';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Resume from '../Application/resumeModel';
import { FaRegEdit, FaUserCircle, FaFileAlt, FaLock, FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { SetUser } = useContext(Context);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);
  const [newpass, setNewPass] = useState(true);
  const [updateInfo, setUpdateInfo] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
    resume: null,
    isResume: ""
  });

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACK_URL}api/auth/getby/${id}`, { withCredentials: true });
      if (!res.data.status) {
        setError(true);
      } else {
        res.data.data.profileSet ? setProfile(res.data.data.profile.url) : setProfile(null);
        setUpdateInfo({
          ...updateInfo,
          username: res.data.data.username,
          email: res.data.data.email,
          phone: res.data.data.phone,
          role: res.data.data.role,
          resume: res.data.data.resume,
          isResume: res.data.data.isResume
        });
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };

  const updateFunction = async () => {
    try {
      setLoading(true);
      await axios.put(`${import.meta.env.VITE_BACK_URL}api/auth/update/${id}`, {
        username: updateInfo.username,
        email: updateInfo.email,
        phone: updateInfo.phone,
        password: updateInfo.password,
        newPassword: updateInfo.newPassword
      }, { withCredentials: true }).then((res) => {
        if (res.data.status) {
          SetUser(res.data.e);
          toast.success("Profile updated successfully!");
          setUpdata(true);
        }
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update profile");
      setLoading(false);
    }
  };

  const [updt, setUpdata] = useState(true);

  const addResume = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', updateInfo.resume);
      const res = await axios.post(`${import.meta.env.VITE_BACK_URL}api/auth/setresume/${id}`, formData, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.ek));
      setUpdateInfo({
        ...updateInfo,
        resume: res.data.ek.resume,
        isResume: true
      });
      toast.success("Resume Uploaded");
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload resume");
      setLoading(false);
    }
  };

  const handleEditIconClick = () => {
    setFlag(false);
    fileInputRef.current.click();
  };

  const [flag, setFlag] = useState(true);
  const fileInputRef = useRef(null);

  const ProfileChange = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profile", profile);
      const res = await axios.post(`${import.meta.env.VITE_BACK_URL}api/auth/setprofile`, formData, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setProfile(res.data.user.profile.url);
      setFlag(true);
      toast.success("Profile Picture Updated");
      setLoading(false);
    } catch (err) {
      setFlag(true);
      console.log(err);
      toast.error("Failed to update profile picture");
      setLoading(false);
    }
  };

  const [OpenModal, setOpenModal] = useState(false);
  const [isImageUrl, setUrl] = useState('');

  const openModel = (ImageUrl) => {
    setUrl(ImageUrl);
    setOpenModal(true);
  };

  const closeModel = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-700">We couldn't fetch your profile information</p>
          <button 
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {OpenModal && <Resume imageurl={isImageUrl} onclose={closeModel} />}
      {!OpenModal && (
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Panel: Profile Picture and Resume */}
            <div className="w-full md:w-1/3 order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold">Personal Assets</h2>
                </div>
                <div className="p-6">
                  {/* Profile Picture Section */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="relative group">
                      <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg transition-transform transform hover:scale-105">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${profile ? profile : userImg})` }}
                        ></div>
                      </div>
                      <div 
                        className="absolute bottom-2 right-2 bg-indigo-500 rounded-full p-2 text-white cursor-pointer shadow-md hover:bg-indigo-700 transition-colors"
                        onClick={handleEditIconClick}
                      >
                        <FaRegEdit size={20} />
                      </div>
                    </div>
                    <form onSubmit={ProfileChange} className="w-full mt-4">
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => setProfile(e.target.files[0])} 
                      />
                      {!flag && (
                        <button 
                          type="submit" 
                          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                        >
                          Update Photo
                        </button>
                      )}
                    </form>
                    <h3 className="mt-4 text-2xl font-bold text-gray-800">{updateInfo.username}</h3>
                    <p className="text-indigo-600 font-medium">{updateInfo.role}</p>
                  </div>

                  {/* Resume Section */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <FaFileAlt className="mr-2 text-indigo-500" /> Resume
                    </h3>
                    
                    {updateInfo.isResume && (
                      <div 
                        className="mb-4 bg-indigo-50 p-4 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors flex items-center"
                        onClick={() => openModel(updateInfo.resume)}
                      >
                        <div className="w-16 h-20 bg-white border rounded shadow flex items-center justify-center mr-4">
                          <FaFileAlt className="text-indigo-400" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">View Resume</p>
                          <p className="text-sm text-gray-600">Click to open</p>
                        </div>
                      </div>
                    )}
                    
                    <form onSubmit={addResume} className="space-y-4">
                      <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          {updateInfo.isResume ? "Update Resume" : "Upload Resume"}
                        </label>
                        <div className="flex items-center space-x-2">
                          <label className="bg-white border border-gray-300 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-50 flex-1 text-center text-sm">
                            <input 
                              type="file" 
                              className="hidden" 
                              onChange={(e) => setUpdateInfo({ ...updateInfo, resume: e.target.files[0] })} 
                            />
                            Choose File
                          </label>
                          <span className="text-sm text-gray-500 truncate max-w-xs">
                            {updateInfo.resume && updateInfo.resume.name ? updateInfo.resume.name : "No file chosen"}
                          </span>
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-700 transition-all font-medium"
                      >
                        {updateInfo.isResume ? "Update Resume" : "Upload Resume"}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Profile Details */}
            <div className="w-full md:w-2/3 order-1 md:order-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all hover:shadow-2xl">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
                  <h2 className="text-2xl font-bold flex items-center">
                    <FaUserCircle className="mr-2" /> Your Profile
                  </h2>
                  <p className="opacity-80">Manage your personal information</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Username Field */}
                  <div className="bg-indigo-50 p-6 rounded-xl transition-all hover:shadow-md">
                    <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <FaUser className="mr-2 text-indigo-500" /> Full Name
                    </label>
                    <input 
                      type="text" 
                      className={`w-full p-3 border ${updt ? 'bg-gray-100' : 'bg-white'} rounded-lg text-xl font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all`}
                      value={updateInfo.username} 
                      disabled={updt} 
                      onChange={(e) => setUpdateInfo({ ...updateInfo, username: e.target.value })} 
                    />
                  </div>

                  {/* Email Field */}
                  <div className="bg-indigo-50 p-6 rounded-xl transition-all hover:shadow-md">
                    <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <FaEnvelope className="mr-2 text-indigo-500" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      className={`w-full p-3 border ${updt ? 'bg-gray-100' : 'bg-white'} rounded-lg text-xl font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all`}
                      value={updateInfo.email} 
                      disabled={updt} 
                      onChange={(e) => setUpdateInfo({ ...updateInfo, email: e.target.value })} 
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="bg-indigo-50 p-6 rounded-xl transition-all hover:shadow-md">
                    <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                      <FaPhone className="mr-2 text-indigo-500" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      className={`w-full p-3 border ${updt ? 'bg-gray-100' : 'bg-white'} rounded-lg text-xl font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all`}
                      value={updateInfo.phone} 
                      disabled={updt} 
                      onChange={(e) => setUpdateInfo({ ...updateInfo, phone: e.target.value })} 
                    />
                  </div>

                  {/* Password Fields - Only show when editing */}
                  {!updt && (
                    <div className="space-y-6">
                      <div className="bg-indigo-50 p-6 rounded-xl transition-all hover:shadow-md">
                        <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                          <FaLock className="mr-2 text-indigo-500" /> Current Password
                        </label>
                        <input 
                          type="password" 
                          className="w-full p-3 border bg-white rounded-lg text-lg font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                          value={updateInfo.password} 
                          onChange={(e) => setUpdateInfo({ ...updateInfo, password: e.target.value })} 
                          placeholder="Enter your current password"
                        />
                      </div>

                      <div className="bg-indigo-50 p-6 rounded-xl transition-all">
                        <div className="flex items-center mb-4">
                          <input 
                            type="checkbox" 
                            id="changePassword" 
                            className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            checked={!newpass}
                            onChange={() => setNewPass(!newpass)}
                          />
                          <label htmlFor="changePassword" className="ml-2 text-sm font-medium text-gray-700">
                            Change Password
                          </label>
                        </div>

                        {!newpass && (
                          <div className="transition-all">
                            <label className="block text-sm font-medium text-gray-600 mb-1 flex items-center">
                              <FaLock className="mr-2 text-indigo-500" /> New Password
                            </label>
                            <input 
                              type="password" 
                              className="w-full p-3 border bg-white rounded-lg text-lg font-medium text-gray-800 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                              value={updateInfo.newPassword} 
                              onChange={(e) => setUpdateInfo({ ...updateInfo, newPassword: e.target.value })} 
                              placeholder="Enter new password"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-4 space-y-4">
                    {!updt && (
                      <button 
                        onClick={updateFunction} 
                        className="w-full py-3 bg-white border-green-500 text-green-500 hover:bg-gradient-to-r from-green-500 to-emerald-600 hover:text-white rounded-lg shadow hover:from-green-600 hover:to-emerald-700 transition-all font-medium flex items-center justify-center"
                      >
                        <FaRegEdit className="mr-2" /> Save Changes
                      </button>
                    )}

                    <button 
                      onClick={() => setUpdata(!updt)} 
                      className={`w-full py-3 ${updt ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700' : ' bg-white border-green-500 text-green-500 hover:bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'} hover:text-white rounded-lg shadow transition-all font-medium flex items-center justify-center`}
                    >
                      <FaRegEdit className="mr-2" /> {updt ? "Edit Profile" : "Cancel Editing"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
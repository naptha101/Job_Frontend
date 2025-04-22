import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { FaEnvelope, FaUser, FaComment, FaPaperPlane, FaMapMarkerAlt, FaPhone, FaLock } from 'react-icons/fa';

const Contact = () => {
    const { SetNav } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        SetNav("contact");
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            
            // Reset success message after 5 seconds
            setTimeout(() => {
                setSubmitted(false);
            }, 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-16">
            {/* Hero Section */}
            <div className="relative mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl transform -skew-y-3"></div>
                <div className="relative container mx-auto px-6 py-20 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Get in Touch with Us
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                        We'd love to hear from you! Whether you have a question, feedback, or just want to say hello.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
                    {/* Contact Information */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                                <p className="text-blue-100">Reach out to us through any of these channels</p>
                            </div>
                            
                            <div className="p-6">
                                <div className="space-y-6">
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FaMapMarkerAlt className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Our Office</h3>
                                            <p className="text-gray-600">123 Business Avenue, Tech Park, CA 92101</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FaPhone className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Phone</h3>
                                            <p className="text-gray-600">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FaEnvelope className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-800">Email</h3>
                                            <p className="text-gray-600">support@yourcompany.com</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="mt-10">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
                                    <div className="flex space-x-4">
                                        <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        </a>
                                        <a href="#" className="bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-full transition duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-6">
                                <h2 className="text-2xl font-bold text-white mb-2">Send a Message</h2>
                                <p className="text-blue-100">Fill out the form below and we'll get back to you as soon as possible</p>
                            </div>
                            
                            <div className="p-6">
                                {submitted ? (
                                    <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-medium text-green-800">Message sent successfully!</h3>
                                                <p className="text-green-700 mt-1">Thank you for your message. We'll get back to you soon.</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} method="post" action="https://getform.io/f/ba630b39-fbbc-4640-bcc5-96654e792c2b" className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaUser className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="py-3 pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaEnvelope className="text-gray-400" />
                                                </div>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="py-3 pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                    placeholder="Enter your email address"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                                            <div className="relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                                                    <FaComment className="text-gray-400" />
                                                </div>
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows="6"
                                                    className="py-3 pl-10 w-full bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                                    placeholder="How can we help you?"
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center">
                                            <input
                                                id="privacy-policy"
                                                name="privacy-policy"
                                                type="checkbox"
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                required
                                            />
                                            <label htmlFor="privacy-policy" className="ml-2 block text-sm text-gray-600">
                                                I agree to the <a href="#" className="text-blue-600 hover:underline">privacy policy</a> and <a href="#" className="text-blue-600 hover:underline">terms of service</a>.
                                            </label>
                                        </div>
                                        
                                        <div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                {isSubmitting ? (
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                ) : (
                                                    <FaPaperPlane className="mr-2" />
                                                )}
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* FAQ Section */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
                    
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">How quickly will I get a response?</h3>
                            <p className="text-gray-600">We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters, please call our support line.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">What information should I include in my message?</h3>
                            <p className="text-gray-600">Please provide as much detail as possible about your inquiry, including any relevant account information, order numbers, or specific questions you have.</p>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="text-lg font-medium text-gray-800 mb-2">Do you provide support during weekends?</h3>
                            <p className="text-gray-600">Our regular support hours are Monday to Friday, 9 AM to 6 PM. Limited support is available during weekends for premium customers.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Map Section */}
            <div className="mt-16 bg-white py-12">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Visit Our Office</h2>
                    
                    <div className="bg-gray-200 h-96 rounded-xl overflow-hidden shadow-lg">
                        {/* Map placeholder - In a real app, you'd integrate Google Maps or similar */}
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                            <div className="text-center">
                                <FaMapMarkerAlt className="text-5xl text-blue-600 mx-auto mb-4" />
                                <p className="text-gray-700 text-lg">Interactive map would be displayed here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="mt-16">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">Subscribe to our newsletter to receive updates, news, and special offers directly to your inbox.</p>
                        
                        <form className="max-w-md mx-auto flex">
                            <div className="relative flex-grow">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="text-gray-400" />
                                </div>
                                <input 
                                    type="email" 
                                    className="w-full py-3 pl-10 pr-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="Enter your email" 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="bg-indigo-800 hover:bg-indigo-900 text-white font-medium py-3 px-6 rounded-r-lg transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="bg-red-600 py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-200">We are dedicated to saving lives through blood donation. Learn more about our mission and how you can get involved.</p>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-200">
              <li className="mb-2"><a href="#" className="hover:text-white">Donate Blood</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">Find a Donor</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">How to Donate</a></li>
              <li className="mb-2"><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-200">Have questions? Reach out to us at:</p>
            <p className="text-gray-200">Phone: +1 (800) 123-4567</p>
            <p className="text-gray-200">Email: <a href="mailto:info@blooddonation.com" className="hover:text-white">info@blooddonation.com</a></p>
          </div>
          <div className="w-full lg:w-1/4 px-4 mb-8">
            <h3 className="text-white text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex items-center">
              <a href="#" className="text-gray-200 hover:text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-200 hover:text-white mr-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-200 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-4.29-1.71a4 4 0 00-5.66 0 4 4 0 000 5.66 4 4 0 005.66 0 4 4 0 000-5.66z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
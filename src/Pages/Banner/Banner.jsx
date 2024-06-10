import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';
import image from '../../assets/home_1_slider_1.webp';

const Banner = () => {
  return (
    <div>
      <Parallax bgImage={image} strength={500}>
        <div className='w-full h-[250px] md:h-[450px] lg:h-[750px] flex flex-col items-center justify-center'>
          <div className='flex items-center flex-col gap-8 text-center p-4'>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
              <span className="text-red-600 text-4xl md:text-5xl lg:text-6xl font-bold shadow-lg">
                Share Your Power:
              </span>
              <br className="hidden md:inline" />
              Donate Blood and Make a Difference
            </h2>
            <div className='flex flex-col md:flex-row gap-4'>
              <Link to={'/login'}>
                <button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Join as Donor
                </button>
              </Link>
              <Link to={'/search'}>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m3-9A7 7 0 1110 4a7 7 0 018 8z"></path>
                  </svg>
                  Search Donors
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Parallax>
    </div>
  );
};

export default Banner;

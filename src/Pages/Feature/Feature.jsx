import React from 'react';

const Feature = () => {
  return (
    <div className='my-36'>
      <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl text-center font-bold text-red-600 mb-8">
          Why Donate Blood?
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m1-11a9 9 0 11-6 0m-3 9a9 9 0 11-6 0"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Save Lives</h3>
              <p className="text-gray-600 text-center">
                Every blood donation can save up to three lives. Your donation can be the difference between life and death for those in need.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m-1-1v-3a1 1 0 012 0v3m4 4h-1v-4h-1m-1-1v-3a1 1 0 012 0v3m4 4h-1v-4h-1m-1-1v-3a1 1 0 012 0v3m4 4h-1v-4h-1m-1-1v-3a1 1 0 012 0v3"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Easy and Quick</h3>
              <p className="text-gray-600 text-center">
                The blood donation process is simple and takes less than an hour. Your little effort can make a big impact.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="mb-4">
                <svg className="w-12 h-12 text-red-600 mx-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5a7 7 0 014 0l4 1.14M21 12a7 7 0 01-4 0l-4-1.14M3 12a7 7 0 014 0l4 1.14M12 21v-6"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Community Impact</h3>
              <p className="text-gray-600 text-center">
                Your blood donation not only helps individuals but also strengthens the community by ensuring a steady blood supply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Feature;
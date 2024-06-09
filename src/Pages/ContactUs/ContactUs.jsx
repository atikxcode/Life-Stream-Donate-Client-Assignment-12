import React from 'react';
import { useForm } from 'react-hook-form';

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to API or email)
  };
  return (
    <div>
      <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl text-center font-bold text-red-600 mb-8">
          Contact Us
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-2xl font-semibold text-center mb-4">Get in Touch</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-red-600`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <p className="text-red-600 mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-red-600`}
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                  />
                  {errors.email && <p className="text-red-600 mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-600' : 'border-gray-300'} rounded-lg focus:outline-none focus:border-red-600`}
                    rows="4"
                    {...register('message', { required: 'Message is required' })}
                  ></textarea>
                  {errors.message && <p className="text-red-600 mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col justify-center items-center">
              <h3 className="text-2xl font-semibold text-center mb-4">Contact Information</h3>
              <p className="text-gray-600 text-center mb-2">
                If you have any questions, feel free to reach out to us at:
              </p>
              <p className="text-red-600 text-2xl font-bold text-center">
                +1 (800) 123-4567
              </p>
              <p className="text-gray-600 text-center">
                Or email us at <a href="mailto:info@blooddonation.com" className="text-red-600">info@blooddonation.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default ContactUs;
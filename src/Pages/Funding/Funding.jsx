import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import PaymentComponent from '../Payment/PaymentComponent';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';

const stripePromise = loadStripe('pk_test_51PPvXCRr6UQJE1JCfynZR5iP9gDrW49XALtyYPUgXRbTzd1TzaC92CmkOWfAGKwEPXYdLzABIHKkPy805mcyYHgm00qXqbVYfn');
const Funding = () => {

  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure();
  const [showPayment, setShowPayment] = useState(false);

  const { isPending, isError, error, refetch, data: fundings } = useQuery({
    queryKey: ['fundings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/funding');
      return res.data;
    }
  });

  const handleGiveFundClick = () => {
    setShowPayment(!showPayment);
  };

  const handlePayment = (paymentMethod) => {
    // Handle payment logic here
    console.log('Payment successful:', paymentMethod);
  };

  if (isPending) {
    return <div className="mx-auto container flex justify-center"><span className="loading loading-dots loading-lg"></span></div>;
  }

  console.log(fundings)

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  refetch();


  return (
    <div className='min-h-screen my-20 mx-auto container'>

    <Helmet>
      <meta charSet="utf-8" />
      <title>Funding - Life Stream Donate</title>

      </Helmet>

      <div className='my-20 flex justify-end'>
        <button className='btn' onClick={handleGiveFundClick}>Give Fund</button>
      </div>
      {showPayment && (
        <div className='my-20'>
          <Elements stripe={stripePromise}>
            <PaymentComponent onPayment={handlePayment} />
          </Elements>
        </div>
      )}

      <div className='flex justify-center my-16'>
        <h2 className='text-2xl text-center md:text-2xl lg:text-3xl xl:text-3xl font-semibold'><span className='font-bold'>Wall of Gratitude:</span> Our Generous Contributors</h2>
      </div>

      {
        fundings.map(funding => 
         
            <div key={funding._id} className="overflow-x-auto shadow-custom rounded-2xl mb-10">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th className='text-center'>Name</th>
        <th className='text-center'>Fund Amount</th>
        <th className='text-center'>Funding Date</th>
        
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
       
        <td className='text-center'>
          <div className="flex items-center gap-3">
            <div className="avatar">
              
            </div>
            <div className='w-full'>
              <div className="font-bold">{funding?.name}</div>
              <div className="text-sm opacity-50">{funding?.email}</div>
            </div>
          </div>
        </td>
        <td className='text-center'>
          ${funding?.amount}
          
        </td >
        <td className='text-center'>{funding?.date}</td>
        
      </tr>

    </tbody>


    
  </table>
         </div>
          
        )
      }
    </div>
  );
};

export default Funding;
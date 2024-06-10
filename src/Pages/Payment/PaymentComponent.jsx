import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentComponent = ({ onPayment }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const onSubmit = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: user?.displayName || data.name,
        email: user?.email || data.email,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0];

      const paymentData = {
        name: user?.displayName || data.name,
        amount: parseFloat(data.amount),
        date: formattedDate,
        email: user?.email || data.email,
      };

      console.log(paymentData);

      try {
        const response = await axiosSecure.post('/funding', paymentData);
        console.log(response.data);
        onPayment(result.paymentMethod, data.amount);
        
        // Display success message
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your payment has been processed successfully',
          showConfirmButton: false,
          timer: 1500
        });
        reset()
      } catch (error) {
        console.error('Error posting data to database:', error);
      }
      
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="payment-form bg-gray-800 p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl text-white mb-6">Enter Payment Details</h2>
      <div className="mb-4">
        <label htmlFor="card-element" className="block text-white mb-2">Card Details</label>
        <div id="card-element" className="p-3 bg-gray-900 text-white rounded-md">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-white mb-2">Amount in $</label>
        <input
          type="number"
          id="amount"
          {...register('amount', { required: true })}
          onChange={handleAmountChange} // Add onChange event handler
          placeholder="Enter amount"
          className="amount-input w-full p-3 rounded-md bg-gray-900 text-white"
          required
        />
        {errors.amount && <p className="text-red-500">Amount is required</p>}
      </div>
      <button
        type="submit"
        disabled={!stripe || !amount}
        className={`pay-button w-full p-3 rounded-md text-white ${stripe && amount ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600'}`}
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentComponent;

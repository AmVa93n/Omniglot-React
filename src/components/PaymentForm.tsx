import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import appService from '../services/app.service';
import useNotifications from '../hooks/useNotifications';
import useAuth from '../hooks/useAuth';
import { Offer } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

interface Props {
    offer: Offer;
    date: string;
    timeslot: string;
}

const domain = import.meta.env.VITE_DOMAIN;

function PaymentForm({ offer, date, timeslot }: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const { sendNotification } = useNotifications();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }

        toast.info('Processing payment...');
    
        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: `${domain}/offers/${offer._id}/book`,
          },
          redirect: 'if_required',
        });
    
        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          toast.dismiss();
          toast.error(`Payment failed: ${error.message}`);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          await appService.createClass(offer._id, { date, timeslot });
          sendNotification(user!._id, offer.creator._id, 'booking');
          navigate('/account/classes');
          toast.dismiss();
          toast.success('Successfully booked class!');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='payment-form'>
            <PaymentElement />
            <button type="submit" className='pay-button' disabled={!stripe}>
              <i className="bi bi-credit-card"></i>Complete Payment
            </button>
        </form>
    )
}

export default PaymentForm;
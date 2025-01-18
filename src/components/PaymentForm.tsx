import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import appService from '../services/app.service';

interface Props {
    offerId: string;
    date: string;
    timeslot: string;
}

const domain = import.meta.env.VITE_DOMAIN;

function PaymentForm({ offerId, date, timeslot }: Props) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js hasn't yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const {error} = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: `${domain}/offers/${offerId}/book`,
          },
          redirect: 'if_required',
        });
    
        if (error) {
          // This point will only be reached if there is an immediate error when
          // confirming the payment. Show error to your customer (for example, payment
          // details incomplete)
          alert(error.message);
        } else {
          // Your customer will be redirected to your `return_url`. For some payment
          // methods like iDEAL, your customer will be redirected to an intermediate
          // site first to authorize the payment, then redirected to the `return_url`.
          await appService.createClass(offerId, { date, timeslot });
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
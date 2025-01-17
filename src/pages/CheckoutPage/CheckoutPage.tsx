import appService from "../../services/app.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Offer } from "../../types";
import Avatar from "../../components/Avatar";
import LanguageChip from "../../components/LanguageChip/LanguageChip";
import InfoChip from "../../components/InfoChip/InfoChip";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "../../components/PaymentForm";
import './CheckoutPage.css';
import PaymentStatus from "../../components/PaymentStatus";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!)

function CheckoutPage() {
    const { offerId } = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [timeslot, setTimeslot] = useState<string>('');
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        async function fetchOffer() {
            if (!offerId) return;
            const offer = await appService.getOffer(offerId);
            setOffer(offer);
        }
        fetchOffer();
    }, [offerId]);

    async function createPayment() {
        if (!offerId) return;
        const { client_secret } = await appService.bookOffer(offerId);
        setClientSecret(client_secret);
    };

    return (
        <div className="checkout-page">
            {offer && 
            <div className="offer-summary">
                <h5>{offer?.name}</h5>
                
                <div className="offer-creator">
                    <Avatar src={offer?.creator?.profilePic} size={50} />
                    <span className="username">{offer?.creator?.username}</span>
                </div>

                <LanguageChip code={offer?.language} />
                <InfoChip type="level" text={offer?.level} />
                <InfoChip type="location" text={offer?.locationType} />
                <InfoChip type="class" text={offer?.classType} secondaryText={offer?.maxGroupSize}/>
                <InfoChip type="weekdays" text={offer?.weekdays?.join(', ')} />
                <InfoChip type="duration" text={offer?.duration.toString()} />
                <InfoChip type="price" text={offer?.price.toString()} />
            </div>}

            <div className="class-booking">
                <div className="form-group">
                    <label htmlFor="date">Choose a date</label>
                    <input type="date" id="date" placeholder="Choose a date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="timeslot">Choose a time slot</label>
                    <select id="timeslot" name="timeslot" value={timeslot} onChange={(e) => setTimeslot(e.target.value)}>
                        {offer?.timeslots?.map((timeslot) => (
                            <option key={timeslot} value={timeslot}>{timeslot}</option>
                        ))}
                    </select>
                </div>

                <button className="checkout-button" onClick={createPayment}>
                    <i className="bi bi-credit-card"></i>Contine to checkout
                </button>
            </div>

            {clientSecret && offerId &&
            <Elements stripe={stripePromise} options={{clientSecret: clientSecret}} >
                <PaymentForm offerId={offerId} date={date} timeslot={timeslot} />
                <PaymentStatus />
            </Elements>}
        </div>
    );
}

export default CheckoutPage;
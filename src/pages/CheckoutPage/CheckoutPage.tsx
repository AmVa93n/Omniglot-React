import appService from "../../services/app.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Offer } from "../../types";
import Avatar from "../../components/reusable/Avatar";
import LanguageChip from "../../components/reusable/LanguageChip/LanguageChip";
import InfoChip from "../../components/reusable/InfoChip/InfoChip";
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from "../../components/PaymentForm";
import './CheckoutPage.css';
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import useDate from "../../hooks/useDate";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY!)

function CheckoutPage() {
    const { offerId } = useParams();
    const [offer, setOffer] = useState<Offer | null>(null);
    const today = new Date();
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1);
    const [date, setDate] = useState(tomorrow.toISOString().split('T')[0]);
    const [timeslot, setTimeslot] = useState<string>('');
    const [clientSecret, setClientSecret] = useState('');
    const { weekdays } = useDate();

    useEffect(() => {
        async function fetchOffer() {
            if (!offerId) return;
            const { offer, clientSecret } = await appService.getOffer(offerId);
            setOffer(offer);
            setTimeslot(offer.timeslots[0]);
            setClientSecret(clientSecret);
        }
        fetchOffer();
    }, [offerId]);

    function handleDateChange(date: Date | null) {
        if (date) {
            setDate(date.toISOString().split('T')[0])
        } else {
            setDate('')
        }
    }

    function isValidWeekday(date: Date) {
        const dayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;
        return offer?.weekdays.includes(weekdays[dayIndex]) || false;
    }

    return (
        <div className="checkout-page">
            <div className="checkout-container">
                <h3>Review Offer Details</h3>
                {offer && 
                <div className="offer-summary">
                    <h5>{offer?.name}</h5>
                    
                    <Link to={`/users/${offer?.creator?._id}`}>
                        <div className="offer-creator">
                            <Avatar src={offer?.creator?.profilePic} size={50} />
                            <span className="username">{offer?.creator?.username}</span>
                        </div>
                    </Link>

                    <div className="offer-info">
                        <LanguageChip code={offer?.language} />
                        <InfoChip type="level" text={offer?.level} />
                        <InfoChip type="location" text={offer?.locationType} />
                        <InfoChip type="class" text={offer?.classType} secondaryText={offer?.maxGroupSize}/>
                        <InfoChip type="weekdays" text={offer?.weekdays?.join(', ')} />
                        <InfoChip type="duration" text={offer?.duration.toString()} />
                        <InfoChip type="price" text={offer?.price.toString()} />
                    </div>
                </div>}

                <h3>Booking Details</h3>
                <div className="booking-details">
                    <div className="form-group">
                        <label htmlFor="date">Choose a date</label>
                        <DatePicker 
                            selected={new Date(date)} 
                            onChange={handleDateChange} 
                            dateFormat="dd / MM / yyyy" 
                            id="date"
                            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 3))}
                            filterDate={(date) => isValidWeekday(date)}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="timeslot">Choose a time slot</label>
                        <select id="timeslot" name="timeslot" value={timeslot} onChange={(e) => setTimeslot(e.target.value)}>
                            {offer?.timeslots?.map((timeslot) => (
                                <option key={timeslot} value={timeslot}>{timeslot}</option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <h3>Payment Details</h3>
                {clientSecret && offer &&
                <Elements stripe={stripePromise} options={{clientSecret: clientSecret}} >
                    <PaymentForm offer={offer} date={date} timeslot={timeslot} />
                </Elements>}
            </div>
        </div>
    );
}

export default CheckoutPage;
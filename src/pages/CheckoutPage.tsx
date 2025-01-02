import appService from "../services/app.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Offer, User } from "../types";
import Language from "../components/Language";
import { ClassType, ClassLocation, Level } from "../components/Snippet";
import UserAvatar from "../components/UserAvatar";

function CheckoutPage() {
    const { offerId } = useParams();
    const [offer, setOffer] = useState<Offer>({} as Offer);
    const [teacher, setTeacher] = useState<User>({} as User);

    useEffect(() => {
        async function fetchOffer() {
            if (!offerId) return;
            const { offer, teacher } = await appService.getOffer(offerId);
            setOffer(offer);
            setTeacher(teacher);
        }
        fetchOffer();
    }, [offerId]);

    function initialize() {
    }

    return (
        <>
            <h3 className="center my-3">Review offer details</h3>
            <div className="d-flex content-box mt-0 mb-3" style={{width: '40%', margin: 'auto'}}>

                <div className="me-3" style={{width: '50%'}}>
                    <h5 className="card-header mb-3">{offer?.name}</h5>
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-3">
                            <UserAvatar user={teacher} size={50} />
                            <span className="fs-5">{teacher?.username}</span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col"> 
                                <Language code={offer?.language} />
                            </span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col">
                                <Level level={offer?.level} />
                            </span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col stylize">
                                <ClassLocation type={offer?.locationType} />
                            </span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col">
                                <ClassType type={offer?.classType} maxGroupSize={offer?.maxGroupSize}/>
                            </span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col">
                                <i className="bi bi-calendar-fill me-2"></i>{offer?.weekdays.join(', ')}
                            </span>
                        </div>

                        <div className="row mb-2">
                            <span className="card-text col"><i className="bi bi-clock-fill me-2"></i>{offer?.duration} Minutes</span>
                        </div>

                        <div className="row" style={{marginBottom: '12rem'}}>
                            <span className="card-text col"><i className="bi bi-tag-fill me-2"></i><span className="price">$</span>{offer?.price}.00</span>
                        </div>

                        <div className="container mb-3">
                            <div className="form-group">
                                <label htmlFor="datepicker">Choose a date</label>
                                <input type="text" id="datepicker" className="form-control" placeholder="Choose a date" name="date" required/>
                            </div>
                        </div>

                        <div className="container mb-4">
                            <label htmlFor="timeslot">Choose a time slot</label>
                            <select className="form-select" id="timeslot" name="timeslot"> 
                                {offer?.timeslots.map((timeslot) => (
                                    <option key={timeslot} value={timeslot}>{timeslot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-warning rounded-pill" onClick={initialize}>
                            <i className="bi bi-credit-card me-2"></i>Contine to checkout</button>
                        </div>

                    </div>
                </div>

                <div id="checkout" style={{width: '306.05px'}}>
                    {/* Checkout will insert the payment form here */}
                </div>

            </div>
        </>
    );
}

export default CheckoutPage;
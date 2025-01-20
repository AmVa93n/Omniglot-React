import { Class, reviewForm } from "../../types";
import { useContext, useState } from "react";
import accountService from "../../services/account.service";
import { AccountContext } from "../../context/account.context";
import './CreateReviewModal.css';
import useNotifications from "../../hooks/useNotifications";
import useAuth from "../../hooks/useAuth";

interface Props {
    cls: Class;
    onClose: () => void;
}

function ReviewForm({ cls, onClose }: Props) {
    const [reviewForm, setReviewForm] = useState<reviewForm>({
        text: "",
        rating: 0
    });
    const [hoverRating, setHoverRating] = useState(0);
    const { setClasses } = useContext(AccountContext);
    const { sendNotification } = useNotifications();
    const { user } = useAuth();

    function handleMouseOver(event: React.MouseEvent) {
        const rating = Number((event.target as HTMLSpanElement).id)
        setHoverRating(rating)
    }

    function handleMouseOut() {
        setHoverRating(0)
    }

    function handleClick() {
        setReviewForm(prev => {
            return {...prev, rating: hoverRating}
        })
    }

    function handleChange(event: React.ChangeEvent) {
        const { name, value } = event.target as HTMLInputElement
        setReviewForm(prev => {
            return {...prev, [name]: value}
        })
    }

    async function handleSubmit() {
        try {
            await accountService.createReview(cls._id, reviewForm)
            setClasses(prev => prev.map(c => c._id === cls._id ? {...c, isRated: true} : c))
            sendNotification(user!._id, cls.teacher._id, 'review')
            onClose()
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Write a review</h2>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="text">How was your class with {cls.teacher.username}?</label>
                        <textarea 
                            placeholder="Describe your experience..." 
                            name="text" 
                            id="text"
                            value={reviewForm.text}
                            onChange={handleChange}
                        />
                    </div>

                    <span>Rate your class</span>
                    <div className="star-rating">
                        {
                            Array.from({length: 10}, (_, i) => (
                                <span 
                                    key={i} 
                                    className={`star ${i+1 <= (hoverRating || reviewForm.rating) && 'active'}`} 
                                    id={String(i+1)}
                                    onClick={handleClick}
                                    onMouseOver={handleMouseOver}
                                    onMouseOut={handleMouseOut}
                                >
                                    &#9733;
                                </span>
                            ))
                        }

                        <input type="hidden" name="rating" id="rating" value={reviewForm.rating} onChange={handleChange}/>
                    </div>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSubmit} >Submit</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;
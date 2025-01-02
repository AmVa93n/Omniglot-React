import { Class, reviewForm } from "../types";
import { useState } from "react";
import ClassCardInReview from "./ClassCardInReview";
import accountService from "../services/account.service";
import '../styles/ReviewForm.css';

interface Props {
    cls: Class;
    setRatedClass: React.Dispatch<React.SetStateAction<Class | null>>;
    setClasses: React.Dispatch<React.SetStateAction<Class[]>>;
}

function ReviewForm({ cls, setRatedClass, setClasses }: Props) {
    const [reviewForm, setReviewForm] = useState<reviewForm>({
        text: "",
        rating: 0
    });
    const [hoverRating, setHoverRating] = useState(0);

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

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        try {
            const updatedClass = await accountService.createReview(cls._id, formData)
            setClasses(prev => prev.map(cls => cls._id === updatedClass._id ? updatedClass : cls))
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div className="content-box" style={{minWidth: '25%'}}>
            <h2 className="mb-3">Write a review</h2>

            <ClassCardInReview cls={cls} />

            <form onSubmit={handleSubmit} method="POST">

                <p className="mb-2">How was your class with {cls.teacher.username}?</p>
                <div className="form-floating mb-4">
                    <textarea 
                        className="form-control" 
                        placeholder="Leave a comment here" 
                        name="text" 
                        id="text"
                        style={{height: '200px'}}
                        value={reviewForm.text}
                        onChange={handleChange}
                    ></textarea>
                    <label htmlFor="text">Describe your experience...</label>
                </div>

                <span>Rate your class</span>
                <div className="star-rating mb-3">
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

                <div className="d-flex justify-content-center gap-2">
                    <button type="submit" className="btn btn-primary rounded-pill">Submit</button>
                    <button type='button' className="btn btn-secondary rounded-pill" onClick={() => setRatedClass(null)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;
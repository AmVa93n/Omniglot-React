import { useState, useEffect } from "react";
import { Review } from "../types";
import accountService from "../services/account.service";
import ReviewCard from "../components/ReviewCard";

function ReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(()=> {
        async function fetchReviews() {
            try {
                const reviews = await accountService.getReviews()
                setReviews(reviews)
            } catch (error) {
                console.log(error)
            }
        }

        fetchReviews()
    }, [])

    return (
        <>
            <h3 className="my-3">My Reviews</h3>
            <div className="d-flex justify-content-center flex-wrap px-auto" style={{width: '100%'}}>
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </>
    );
}

export default ReviewsPage;
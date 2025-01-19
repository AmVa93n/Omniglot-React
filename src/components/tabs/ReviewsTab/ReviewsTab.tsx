import { useContext } from "react";
import ReviewCard from "../../ReviewCard/ReviewCard";
import { AccountContext } from "../../../context/account.context";
import "./ReviewsTab.css";

function ReviewsTab() {
    const { reviews } = useContext(AccountContext);

    return (
        <div className="reviews-tab">
            <div className="reviews-container">
                {reviews.map(review => (
                    <ReviewCard key={review._id} review={review} />
                ))}
            </div>
        </div>
    );
}

export default ReviewsTab;
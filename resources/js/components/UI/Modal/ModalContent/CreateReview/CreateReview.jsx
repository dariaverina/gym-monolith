import { Dialog } from "@headlessui/react";
import { useUI } from "@/context/use-ui";
import { useState } from "react";
import { userStateContext } from '@/context/context-provider';

export default function CreateReview({target_user_id, setReviews}) {
    const { displayModal, closeModal, modalContent } = useUI();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .post("/reviews", {
                user_id: currentUser.id,
                rating: rating,
                content: content,
                target_user_id: target_user_id
            })
            .then((response) => {
                axios
                    .get("/api/reviews/"+target_user_id)
                    .then((res) => setReviews(res.data))
                    .catch((err) => console.log(err));
                closeModal();
            });
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="rating">Rating:</label>
                <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={0}>Select rating</option>
                    <option value={1}>1 star</option>
                    <option value={2}>2 stars</option>
                    <option value={3}>3 stars</option>
                    <option value={4}>4 stars</option>
                    <option value={5}>5 stars</option>
                </select>
            </div>

            <div>
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            <button type="submit">Submit Review</button>
        </form>
    );
}

import { Dialog } from "@headlessui/react";
import { useUI } from "@/context/use-ui";
import { useState } from "react";
import { userStateContext } from "@/context/context-provider";

export default function CreateReview({ target_user_id, setReviews, review_before}) {
    const { displayModal, closeModal, modalContent } = useUI();
    const [rating, setRating] = useState(review_before? review_before.rating: 5);
    const [content, setContent] = useState(review_before? review_before.content : "");
    console.log(content);
    console.log(rating);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!review_before){ axios
            .post("/reviews", {
                user_id: currentUser.id,
                rating: rating,
                content: content,
                target_user_id: target_user_id,
            })
            .then((response) => {
                axios
                    .get("/api/reviews/" + target_user_id)
                    .then((res) => setReviews(res.data))
                    .catch((err) => console.log(err));
                closeModal();
            });
        }
        else{
            axios
            .put(`/reviews/${review_before.id}`, {
                rating: rating,
                content: content,
            })
            .then((response) => {
                axios
                    .get("/api/reviews/" + target_user_id)
                    .then((res) => setReviews(res.data))
                    .catch((err) => console.log(err));
                closeModal();
            });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="bg-gradient-to-b from-indigo-950 to-indigo-800 py-8 px-8 sm:rounded-lg">
            <div className="flex justify-center pb-4 font-extrabold text-transparent text-xl bg-clip-text bg-indigo-600  ">{review_before ? <>Редактировать отзыв</>: <>Новый отзыв</>}</div>
            <div className="sm:col-span-3">
                <label
                    htmlFor="rating"
                    className="block text-sm font-medium leading-6 text-white"
                >
                    Ваша оценка
                </label>
                <div className="mt-2">
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        id="rating"
                        name="rating"
                        className="bg-indigo-300 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                </div>
            </div>
            <div className="col-span-full">
                <label
                    htmlFor="review"
                    className="block text-sm font-medium leading-6 text-white"
                >
                    Ваш отзыв
                </label>
                <div className="mt-2">
                    <textarea
                        id="review"
                        name="review"
                        rows={3}
                        className="bg-indigo-300 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center ">
                <button type="submit" class=" pt-4 font-extrabold text-transparent text-2xl bg-clip-text bg-indigo-300 hover:bg-indigo-100">
                    Сохранить
                </button>
            </div>
        </form>
    );
}

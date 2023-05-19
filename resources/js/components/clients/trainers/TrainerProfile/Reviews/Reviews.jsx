import { StarIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useUI } from "@/context/use-ui";
import CreateReview from "../../../../UI/Modal/ModalContent/CreateReview/CreateReview";
import { userStateContext } from "@/context/context-provider";
import Auth from "../../../../UI/Modal/ModalContent/Auth/Auth";

export default function Reviews({ trainer_id }) {
    const [reviews, setReviews] = useState([]);
    const [countsArray, setCountsArray] = useState([]);
    const { currentUser, setCurrentUser, setUserToken } = userStateContext();

    useEffect(() => {
        reviews && reviews.reviews && calculateCounts(reviews.reviews);
    }, [reviews]);
    useEffect(() => {
        axios
            .get("/api/reviews/" + trainer_id)
            .then((res) => {
                setReviews(res.data);
                calculateCounts(res.data.reviews);
            })
            .catch((err) => console.log(err));
    }, []);
    const calculateCounts = (reviews) => {
        const counts = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        reviews.forEach((review) => {
            const rating = review.rating;
            counts[rating]++;
        });

        const newCountsArray = Object.entries(counts).map(
            ([rating, count]) => ({
                rating: parseInt(rating),
                count,
            })
        );

        setCountsArray(newCountsArray);
    };

    console.log("count", countsArray);
    console.log(reviews);
    console.log(currentUser);

    const handleWriteReview = () => {
        currentUser.id
            ? setModalContent(
                  <CreateReview
                      target_user_id={trainer_id}
                      setReviews={setReviews}
                  />
              )
            : setModalContent(<Auth />);
        openModal();
    };

    const handleDeleteReview = (id) => {
        axios
            .delete(`/reviews/${id}`)
            .then((response) => {
                console.log(response);
                axios.get("/api/reviews/" + trainer_id).then((res) => {
                    setReviews(res.data);
                });
            })
            .catch((error) => {
                console.error("Error deleting review:", error);
            });
    };

    const { openModal, showLoader, hideLoader, setModalContent, displayModal } =
        useUI();
    return (
        <div className="bg-gray-900">
            {reviews?.reviews && (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
                    <div className="lg:col-span-4">
                        <h2 className="text-2xl font-bold tracking-tight text-white">
                            Отзывы клиентов
                        </h2>

                        <div className="mt-3 flex items-center">
                            <div>
                                <div className="flex items-center">
                                    {[0, 1, 2, 3, 4].map((rating) => (
                                        <StarIcon
                                            key={rating}
                                            className={clsx(
                                                reviews.average_rating > rating
                                                    ? "text-yellow-300"
                                                    : "text-gray-300",
                                                "h-5 w-5 flex-shrink-0"
                                            )}
                                            aria-hidden="true"
                                        />
                                    ))}
                                </div>
                                <p className="sr-only">
                                    {reviews.average_rating} out of 5 stars
                                </p>
                            </div>
                            <p className="ml-2 text-sm text-white">
                                Основано на {reviews.reviews.length} отзывах
                            </p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Review data</h3>

                            <dl className="space-y-3">
                                {countsArray &&
                                    countsArray.map((count) => (
                                        <div
                                            key={count.rating}
                                            className="flex items-center text-sm"
                                        >
                                            <dt className="flex flex-1 items-center">
                                                <p className="w-3 font-medium text-white">
                                                    {count.rating}
                                                    <span className="sr-only">
                                                        {" "}
                                                        star reviews
                                                    </span>
                                                </p>
                                                <div
                                                    aria-hidden="true"
                                                    className="ml-1 flex flex-1 items-center"
                                                >
                                                    <StarIcon
                                                        className={clsx(
                                                            count.count > 0
                                                                ? "text-yellow-400"
                                                                : "text-gray-300",
                                                            "h-5 w-5 flex-shrink-0"
                                                        )}
                                                        aria-hidden="true"
                                                    />

                                                    <div className="relative ml-3 flex-1">
                                                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                                                        {count.count > 0 ? (
                                                            <div
                                                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                                                style={{
                                                                    width: `calc(${count.count} / ${reviews.reviews.length} * 100%)`,
                                                                }}
                                                            />
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </dt>
                                            <dd className="ml-3 w-10 text-right text-sm tabular-nums text-white">
                                                {Math.round(
                                                    (count.count /
                                                        reviews.reviews
                                                            .length) *
                                                        100
                                                )}
                                                %
                                            </dd>
                                        </div>
                                    ))}
                            </dl>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-lg font-medium text-white">
                                Поделитесь своим мнением
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Если вы пользовались услугами этого тренера,
                                поделитесь мнением с другими людьми.
                            </p>

                            <button
                                onClick={handleWriteReview}
                                disabled={reviews.reviews.find(
                                    (review) =>
                                        review.user_id === currentUser.id
                                )}
                                className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-indigo-400 bg-transparent px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-800 sm:w-auto lg:w-full"
                            >
                                <div className="flex justify-center">
                                    <h1 class="font-extrabold text-transparent text-xl bg-clip-text bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-700">
                                        Написать отзыв
                                    </h1>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                        <h3 className="sr-only">Recent reviews</h3>

                        <div className="flow-root">
                            <div className="-my-12 divide-y divide-gray-200">
                                {reviews.reviews.map((review) => (
                                    <div key={review.id} className="py-12">
                                        <div className="flex items-center">
                                            {/* Replace `review.avatarSrc` with the appropriate source for the avatar */}
                                            <img
                                                src={
                                                    "https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg"
                                                }
                                                alt={`${review.author}.`}
                                                className="h-12 w-12 rounded-full"
                                            />
                                            <div className="ml-4">
                                                <h4 className="text-sm font-bold text-white">
                                                    {review.name}
                                                </h4>
                                                <div className="mt-1 flex items-center">
                                                    {[0, 1, 2, 3, 4].map(
                                                        (rating) => (
                                                            <StarIcon
                                                                key={rating}
                                                                className={clsx(
                                                                    review.rating >
                                                                        rating
                                                                        ? "text-yellow-300"
                                                                        : "text-gray-300",
                                                                    "h-5 w-5 flex-shrink-0"
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <p className="sr-only">
                                                    {review.rating} out of 5
                                                    stars
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-base italic text-gray-600">
                                            {review.content}
                                            {review.user_id ==
                                                currentUser.id && (
                                                <>
                                                    {" "}
                                                    <button
                                                        onClick={() => {
                                                            setModalContent(
                                                                <CreateReview
                                                                    target_user_id={trainer_id}
                                                                    setReviews={setReviews}
                                                                    review_before={review}
                                                                />
                                                            );
                                                            openModal();
                                                        }}
                                                        className="pl-2"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="gray"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleDeleteReview(
                                                                review.id
                                                            )
                                                        }
                                                        className="pl-2"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="gray"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

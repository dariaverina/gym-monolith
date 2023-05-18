import { StarIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useUI } from '@/context/use-ui';
import CreateReview from '../../../../UI/Modal/ModalContent/CreateReview/CreateReview';


export default function Reviews({trainer_id}) {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        axios
            .get("/api/reviews/"+trainer_id)
            .then((res) => setReviews(res.data))
            .catch((err) => console.log(err));
    }, []);
    console.log(reviews)
    const { openModal, showLoader, hideLoader, setModalContent, displayModal } = useUI();
  return (
    <div className="bg-gray-900">
        {reviews?.reviews &&
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32">
        <div className="lg:col-span-4">
          <h2 className="text-2xl font-bold tracking-tight text-white">Отзывы клиентов</h2>

          <div className="mt-3 flex items-center">
            <div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={clsx(
                      reviews.average_rating > rating ? 'text-yellow-400' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="sr-only">{reviews.average_rating} out of 5 stars</p>
            </div>
            <p className="ml-2 text-sm text-white">Основано на {reviews.reviews.length} отзывах</p>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Review data</h3>

            <dl className="space-y-3">
              {reviews.reviews.map((review) => (
                <div key={review.id} className="flex items-center text-sm">
                  <dt className="flex flex-1 items-center">
                    <p className="w-3 font-medium text-white">
                      {review.rating}
                      <span className="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                      <StarIcon
                        className={clsx(
                          review.rating > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />

                      <div className="relative ml-3 flex-1">
                        <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        {review.rating > 0 ? (
                          <div
                            className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                            style={{ width: `calc(${review.rating} / 5 * 100%)` }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  <dd className="ml-3 w-10 text-right text-sm tabular-nums text-white">
                    {Math.round((review.rating / 5) * 100)}%
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-medium text-white">Поделитесь своим мнением</h3>
            <p className="mt-1 text-sm text-gray-600">
              Если вы пользовались услугами этого тренера, поделитесь мнением с другими людьми.
            </p>

            <button
              onClick={()=>{setModalContent(<CreateReview target_user_id={trainer_id} setReviews={setReviews}/>); openModal()} }
              className="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Написать отзыв
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
                    <img src={"https://1fid.com/wp-content/uploads/2022/06/no-profile-picture-6-1024x1024.jpg"} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
                    <div className="ml-4">
                      <h4 className="text-sm font-bold text-white">{review.name}</h4>
                      <div className="mt-1 flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={clsx(
                              review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                              'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{review.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    className="mt-4 space-y-6 text-base italic text-gray-600"
                    dangerouslySetInnerHTML={{ __html: review.content }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }
    </div>
  );
}

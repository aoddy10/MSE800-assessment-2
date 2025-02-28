import moment from 'moment';
import React from 'react'

function ReviewSection({ reviews }) {

    // random color
    const getRandomColor = () => {
        const colors = [
            "bg-red-500",
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-teal-500",
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    // get initial from first name and last name
    const getInitials = (firstName, lastName) => {
        return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""
            }`.toUpperCase();
    };

    return (

        <div className="bg-white p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="mt-4 space-y-4 bg-[#f9f9fb] p-3 rounded-xl">
                {/* Review 1 */}
                {reviews && reviews.length > 0 ? (
                    reviews.map(review => {
                        return (
                            <div key={`review-${review.id}`} className="p-4 bg-gray-50 rounded-lg shadow">
                                <div className="flex items-center space-x-3">
                                    {/* <img
                                        src="/user1.jpg"
                                        alt={review.id}
                                        className="w-10 h-10 rounded-full"
                                    /> */}
                                    {review.user && (
                                        <div className="flex items-center gap-2">
                                            {review.user.profile_image_url ? (
                                                <img
                                                    src={review.profile_image_url}
                                                    alt="User Avatar"
                                                    className="w-10 h-10 rounded-full border"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-10 h-10 flex items-center justify-center text-white text-lg font-bold rounded-full border ${getRandomColor()}`}
                                                >
                                                    {getInitials(
                                                        review.user.first_name,
                                                        review.user.last_name
                                                    )}
                                                </div>
                                            )}

                                        </div>
                                    )}
                                    <div>
                                        <h3 className="font-medium">
                                            {review.user.first_name + ' ' + review.user.last_name}
                                        </h3>
                                        <p>{moment(review.created_at).format("DD-MM-yyyy")}</p>
                                    </div>
                                    <span className="ml-auto text-yellow-500 font-bold">
                                        {review.rating} ⭐
                                    </span>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">
                                    {review.review}
                                </p>
                            </div>
                        );

                    })

                ) : "No review"}
            </div>
        </div>

    )
}

export default ReviewSection
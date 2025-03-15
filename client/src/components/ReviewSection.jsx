import moment from "moment";
import React, { useContext, useEffect } from "react";
import { UserAvatar } from "./UserAvatar";
import AuthContext from "../context/AuthContext";

function ReviewSection({ reviews, onReviewClick }) {
    const { authUserInfo } = useContext(AuthContext);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="mt-4 space-y-4 bg-[#f9f9fb] p-3 rounded-xl">
                {/* Review 1 */}
                {reviews && reviews.length > 0
                    ? reviews.map((review) => {
                          return (
                              <div
                                  key={`review-${review.id}`}
                                  className="p-4 bg-gray-50 rounded-lg shadow"
                              >
                                  <div className="flex items-center space-x-3">
                                      {review.user && (
                                          <UserAvatar
                                              firstName={review.user.first_name}
                                              lastName={review.user.last_name}
                                              profileImageUrl={
                                                  review.user.profile_image_url
                                              }
                                              size="md"
                                          />
                                      )}
                                      <div>
                                          <h3 className="font-medium">
                                              {review.user.first_name +
                                                  " " +
                                                  review.user.last_name}
                                          </h3>
                                          <p>
                                              {moment(review.created_at).format(
                                                  "DD-MM-yyyy"
                                              )}
                                          </p>
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
                    : "No reviews"}
            </div>
            {authUserInfo && authUserInfo.role === "user" && (
                <button
                    className="text-white bg-[#31AAB7] focus:ring-1 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-4"
                    onClick={onReviewClick}
                >
                    Write Review
                </button>
            )}
        </div>
    );
}

export default ReviewSection;

import moment from "moment";
import React, { useContext } from "react";
import { UserAvatar } from "./UserAvatar";

function ReviewSection({ reviews }) {
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
                                  <div className="flex items-start space-x-3">
                                      <div className="flex gap-2 flex-grow">
                                          {review.user && (
                                              <UserAvatar
                                                  firstName={
                                                      review.user.first_name
                                                  }
                                                  lastName={
                                                      review.user.last_name
                                                  }
                                                  profileImageUrl={
                                                      review.user
                                                          .profile_image_url
                                                  }
                                                  size="md"
                                              />
                                          )}
                                          <div>
                                              <h3 className=" text-sm">
                                                  {review.user.first_name +
                                                      " " +
                                                      review.user.last_name}
                                              </h3>
                                              <p className=" text-sm">
                                                  {moment(
                                                      review.created_at
                                                  ).format("DD-MM-yyyy")}
                                              </p>
                                          </div>
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
        </div>
    );
}

export default ReviewSection;

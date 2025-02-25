import moment from 'moment';
import React from 'react'

function ReviewSection({reviews}) {
  return (
    
        <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="text-xl font-semibold">Reviews</h2>
                        <div className="mt-4 space-y-4">
                            {/* Review 1 */}
                            { reviews && reviews.length> 0 ? (
                                reviews.map(review => {
                                    return (
                                        <div   key={`review-${review.id}`} className="p-4 bg-gray-50 rounded-lg shadow">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="/user1.jpg"
                                        alt={review.id}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div>
                                        <h3 className="font-medium">
                                           {review.id}
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
                                
                            ) : "No review"  }
                            
                            
                          
                        </div>
                    </div>
  
  )
}

export default ReviewSection
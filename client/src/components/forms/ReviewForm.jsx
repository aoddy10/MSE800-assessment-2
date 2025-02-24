import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { createReview }  from  '../../services/location.services'
import AuthContext from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function ReviewForm({locationId, onClose, onRefresh}) {
    const {token} = useContext(AuthContext);
    const [formData,setFormData] =useState({
        review: "", rating:0,location:locationId, user : 1
        });
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage]=useState('');

        useEffect(()=> {
             if (!token){
                 navigate("/login");
             }    
        },[]);
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };

        const handleRatingChange = (rateValue) => {
            setFormData({ ...formData, rating: rateValue });
            //console.log(rateValue);
        };

        const handleSubmit =async() => {
            
            if(!formData.review)
            {
                setErrorMessage("Please provide review");
                return;   
            }

            if(formData.rating===0)
            {
                setErrorMessage("Rating should be 1 to 5");
                return; 
            }
            
            try {
                await createReview({...formData}, token);
                setErrorMessage('');
                onRefresh();
                onClose();

            } catch (error) {
                console.log(error);
            }        
        };

  return (
    

    <div className="flex flex-col gap-5">
        {errorMessage &&      <div className="text-red-400">{errorMessage}</div>}
   
        <textarea name="review" placeholder='Write your review' value={formData.review} onChange={handleChange}  />
        <div className='flex flex-col'>  Please give the rating 
            <div className='flex gap-1' >
            {formData.rating >=1? (<StarIcon onClick={()=> handleRatingChange(1)} className="size-4 text-yellow-200" />):(<StarIcon onClick={()=> handleRatingChange(1)} className="size-4 text-grey-200" />)}
            {formData.rating >=2? (<StarIcon onClick={()=> handleRatingChange(2)}  className="size-4 text-yellow-200" />):(<StarIcon onClick={()=> handleRatingChange(2)} className="size-4 text-grey-200" />)}
            {formData.rating >=3? (<StarIcon onClick={()=> handleRatingChange(3)}  className="size-4 text-yellow-200" />):(<StarIcon onClick={()=> handleRatingChange(3)}  className="size-4 text-grey-200" />)}
            {formData.rating >=4? (<StarIcon onClick={()=> handleRatingChange(4)}  className="size-4 text-yellow-200" />):(<StarIcon onClick={()=> handleRatingChange(4)}  className="size-4 text-grey-200" />)}
            {formData.rating===5? (<StarIcon onClick={()=> handleRatingChange(5)}   className="size-4 text-yellow-200" />):(<StarIcon  onClick={()=> handleRatingChange(5)} className="size-4 text-grey-200" />)}
            </div>
        </div>
        <button className="bg-primary rounded-md" onClick={handleSubmit}>Save</button>
    </div>
  )
}

export default ReviewForm
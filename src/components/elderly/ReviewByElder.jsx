import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from "antd";
import axios from '../../services/axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const { TextArea } = Input;

const ReviewByElder = () => {

    const [rating, setRating] = useState()
    const [review, setReview] = useState()
    let { id } = useParams();
    const navigate = useNavigate();



    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            
            const reviewData = {
                rating: rating,
                review: review,
                id: id
                
            }

            const response = await axios.postRequest("updateRating", reviewData, true);
      

            navigate("/elder/dashboard");

           
          } catch (error) {
            console.error("Form submission error:", error);
          }
    }


    return (
        <div>
            <Form>
                <Form.Item label="Rating">
                    <Input
                        placeholder="Rating out of 5"
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                </Form.Item>
                <Form.Item label="Rating">
                    <TextArea rows={4} placeholder="maxLength is 6" maxLength={50} name='review' value={review} onChange={handleReviewChange} />
                </Form.Item>
                <Button onClick={handleSubmit} type="primary">
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default ReviewByElder
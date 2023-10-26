import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from "antd";


const { TextArea } = Input;

const ReviewByElder = () => {

    const [rating, setRating] = useState()
    const [review, setReview] = useState()



    const handleRatingChange = (e) => {
        setRating(e.target.value);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };





    console.log(rating)
    console.log(review)

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
                <Button type="primary">
                    Submit
                </Button>

            </Form>
        </div>
    )
}

export default ReviewByElder
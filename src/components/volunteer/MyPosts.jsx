import { useEffect, useState } from "react";
import { Card, Space, Button, Modal, Rate, Input } from "antd";
import axios from "../../services/axios";
import IconApply from './../../images/icon_accept.png';
import Edit from './../../images/edit.png';
import moment from "moment";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


// import { Modal } from "antd";


const MyPostVolunteer = ({ posts, fetchMyPosts }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };

  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  const [rating, setRating] = useState()
  let { id } = useParams();
  const navigate = useNavigate();

  const { TextArea } = Input;


  useEffect(() => {
  }, []);


  const handleOk = (postIndex) => {
    handleSubmit(postIndex)
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };


  const handleSubmit = async (postIndex) => {
    try {
      const currentPost = posts[postIndex];
      const reviewData = {
        rating: rating,
        id: currentPost._id

      }

      const response = await axios.postRequest("updateRating" , reviewData, true);

      navigate("/elder/dashboard");


    } catch (error) {
      console.error("Form submission error:", error);
    }
  }




  return (
    <div id="mypostID" className="volunteerMyPost">
      {
        posts.map((post, postIndex) => {
          return (

            <Card
              key={`card-${postIndex}`}
              id="myPostsCard"
            >
              <div className="cardBody" >

                <div className="eventDetails">
                  <h1>{post.serviceTitle}</h1>
                  <h2>{post.address}</h2>

                  <div className="myPostDT">
                    <h2>
                      {moment(post.date).format("D MMMM")} {moment(post.time, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
                    </h2>
                  </div>
                </div>

                {
                  post.status == "PENDING" && <>

                    <div className="deleteEditSection" >
                      <div className="myPostDelete" onClick={() => (post)} >
                        <img src={IconApply} alt="DeleteImage" />
                      </div>
                    </div>



                  </>
                }


                {
                  post.status == "BOOKED" && <>
                    <div className="deleteEditSection">



                      <div className="Review">
                        <>
                          <Button type="primary" onClick={showModal}>
                            Review
                          </Button>
                          <Modal
                            title="How Somchai did it?"
                            open={open}
                            onOk={ () => {handleOk (postIndex)}}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                          >
                            <Space>
                              <Rate
                                tooltips={desc}
                                onChange={(value) => setRating(Math.ceil(value))}
                                value={rating}
                              />
                              {/* {rating ? <span>{rating}</span> : ''} */}
                            </Space>
                            <TextArea rows={4} placeholder="Review" maxLength={100} />
                          </Modal>
                        </>
                      </div>
                    </div>
                  </>
                }

              </div>
            </Card>
          )
        })
      }


      {/* Delete Confirmation Modal */}
      {/* <Modal
        title="Delete Post"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal> */}

    </div>
  )
}

export default MyPostVolunteer;


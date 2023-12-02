import { useEffect, useState } from "react";
import { Card, Space, Button, Modal, Rate, Input } from "antd";
import axios from "../../services/axios";
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import moment from "moment";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


// import { Modal } from "antd";


const MyPosts = ({ posts, fetchMyPosts, changeSingleView }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };

  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
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

  const showDeleteModal = (post) => {
    setPostToDelete(post);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async (postIndex) => {
    try {
      if (postToDelete) {
        const postId = String(postToDelete._id);
        // await axios.deleteRequest(`/deletePost/${postId}`);

        await axios.deleteRequest("deletePost", postId, true);

        fetchMyPosts();
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };


  const handleCancelDelete = () => {
    // Close the delete modal without deleting the post
    setIsDeleteModalVisible(false);
  };


  const findBookedIndex = (post) => {
    const index = post?.invitations.map((invite) => { return invite.status }).indexOf("ACCEPTED");
    return index;
  }

  const responseInvitation = async (postIndex, acceptedUserId, status) => {
    try {
      const postId = posts[postIndex]._id;
      const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);

      fetchMyPosts();

    } catch (err) {
      console.log(err)
    }
  }


  const handleSubmit = async (postIndex) => {
    try {
      const currentPost = posts[postIndex];
      const reviewData = {
        rating: rating,
        id: currentPost._id

      }

      const response = await axios.postRequest("updateRating" , reviewData, true);

      // navigate("/elder/dashboard");
      fetchMyPosts();

    } catch (error) {
      console.error("Form submission error:", error);
    }
  }




  return (
    <div id="mypostID">
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
                      <div className="myPostDelete" onClick={() => showDeleteModal(post)} >
                        <img src={DeleteImage} alt="DeleteImage" />
                      </div>

                      <div className="myPostEdit" onClick={() => { changeSingleView(post) }}>
                        <img src={Edit} alt="Edit" />
                      </div>
                    </div>



                  </>
                }


                {
                  post.status == "BOOKED" && <>
                    <div className="deleteEditSection">
                      
                      <div className="Review">
                        <>
                          <button className="darkBtn" onClick={showModal}>
                            Review
                          </button>
                          <Modal
                            title="How do you like the service ?"
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

    </div>
  )
}

export default MyPosts;


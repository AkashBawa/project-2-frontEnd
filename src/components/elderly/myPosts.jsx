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
  const [fileList, setFileList] = useState([]);
  const [formDataVol, setFormDataVol] = useState({
    profilePhoto: "",
    name: "",
    lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    eContact: "",
  });
  const [volProfile, setVolProfile] = useState({});
  // const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };

  const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];
  const [rating, setRating] = useState()
  let { id } = useParams();
  const navigate = useNavigate();

  const { TextArea } = Input;


  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  useEffect(() => {
    fetchVolUserProfile()
  }, []);


  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
      setFormDataVol(getVolProfile);
      if (getVolProfile.profilePhoto) {
        var file = dataURLtoFile(getVolProfile.profilePhoto, "photo")
        file.originFileObj = file

        setFileList([file])
      }
    } catch (error) {
      console.log(error);
    }

  };



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

      const response = await axios.postRequest("updateRating", reviewData, true);

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

                  <p className="pEvent">{post.address}</p>

                  <div className="myPostDT">
                    <p>
                      {moment(post.date).format("D MMMM")}
                    </p>

                    <p>
                      {moment(post.time, "HH:mm").format("h:mm A")} - {moment(post.endTime, "HH:mm").format("h:mm A")}
                    </p>
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
                            // title={`How did ${setVolProfile.name} do it?`}
                            open={open}
                            // onOk={() => { handleOk(postIndex) }}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            footer={[
                              <Button key="rate" type="primary" onClick={() => { handleOk(postIndex) }}>
                                Rate
                              </Button>,
                            ]}
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

                {
                  post.status !== "BOOKED" && post.status !== "PENDING" && <>
                    <div className="historySection">
                      <>
                        <p>Completed</p>
                      </>
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


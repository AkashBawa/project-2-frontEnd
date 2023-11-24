import { useEffect, useState } from "react";
import { Card, Space, Button, Modal } from "antd";
import axios from "../../services/axios";

import "./css/MyPosts.css"
import DeleteImage from './../../images/delete.png';
import Edit from './../../images/edit.png';
import moment from "moment";


const MyPosts = ({ posts, fetchMyPosts, changeSingleView }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
  }, []);

  const showDeleteModal = (post) => {
    setPostToDelete(post);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = async (postIndex) => {
    try {
      if (postToDelete) {
        const postId = String(postToDelete._id);
        // await axios.deleteRequest(`/deletePost/${postId}`);

        // const postId = posts[postIndex]._id;
        console.log("Deleting post with ID:", postId);
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
      console.log(response);
      fetchMyPosts();

    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div >
      {
        posts.map((post, postIndex) => {
          console.log(posts);
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
                  // post.status == "PENDING" && <>
                  post.status && <>

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




              </div>
            </Card>
          )
        })
      }


      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Post"
        open={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>

    </div>
  )
}

export default MyPosts;


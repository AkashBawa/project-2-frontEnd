import { useState } from "react";
import { Outlet, Link } from "react-router-dom"
import ViewProfile from "../common/ViewProfile";
import axios from "../../services/axios";
import { Modal } from "antd";
import { Button, notification } from 'antd';
import Swal from 'sweetalert2'
// import React, { useState } from 'react';
import AcceptImage from './../../public/icons/icon_accept.png';
import CancelImage from './../../public/icons/icon_cancel.png';
import ProfileImage from "./../../public/icons/profile.png";

const SinglePostView = ({ currentPost, fetchMyPosts, changeSingleView }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  // const [resolution, setResolution] = useState(null);


  const responseInvitation = async (acceptedUserId, status, changeSingleView) => {
    try {
      Swal.fire({
        title: 'Warning',
        text: `Do you want to  ${status === 'ACCEPTED' ? 'accept' : 'reject'} the post`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: "No",
      }).then(async (data) => {
        console.log(data)
        if (data.isConfirmed) {
          const postId = currentPost._id;
          const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);
          console.log(response);
          if (response && response.success) {
            Swal.fire({
              title: "Thanks",
              text: "The Post status is Accepted",
              icon: "success"
            });
            setIsModalOpen(true)
          }
          fetchMyPosts();

        } else {
          return;
        }
      })

    } catch (err) {
      console.log(err)
    }
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const viewProfile = (user) => {
    console.log(user);
    setViewUser(user);
    setIsModalOpen(true);
  }

  return (

    <div className="ElderSinglePost" id="ElderSinglePost">
      <Modal className="textAlignCenter" open={isModalOpen} footer={[]} >
        <ViewProfile user={viewUser} />
        <Link to='/elder/profile'><img src={AcceptImage} alt="iconProfile" /></Link>
        <h2 className="textAlignCenter textCapital">{currentPost.name}</h2>
        <p>Thank you for reviewing my profile</p>
        <button type="primary" className="darkBtn" onClick={handleOk}>Close</button>
      </Modal>

      <h1>{currentPost.serviceTitle}</h1>
      <h2>{currentPost.serviceType}</h2>
      <h2>{currentPost.time ? currentPost.time : currentPost.startTime} - {currentPost.endTime}  </h2>
      {/* <h2>{currentPost.time} </h2> */}
      <h2>{currentPost.address}</h2>

      {
        (currentPost?.invitations && currentPost.invitations.length > 0) ?
          (
            <div className="invitations">
              <h3> Invitations </h3>
              {
                currentPost?.invitations.map((invite, invitationIndex) => {
                  return (
                    // invite.status == "PENDING" &&
                    // (
                    <div className="requestList" key={"invitation-" + invitationIndex}>
                      <img src={invite.user.profilePhoto} alt="Volunteer Image" className="vimg" />
                      <div className="vsummary">
                        <h1>Volunteer Name: {invite.user.name ? invite.user.name : invite.user.email} </h1>
                        <h2>Rating:</h2>
                      </div>

                      <div className="decisionButtons">
                        <span> <img src={AcceptImage} onClick={() => { responseInvitation(invite.user._id, "ACCEPTED") }} /> Accept </span>
                        <span> <img src={CancelImage} onClick={() => { responseInvitation(invite.user._id, "REJECTED") }} /> Reject </span>
                        <span> <img src={ProfileImage} onClick={() => { viewProfile(invite.user) }} /> Profile </span>
                      </div>
                    </div>
                  )
                  // )
                })
              }
            </div>
          ) : (
            <div>
              <span>This post does not have any active invitations</span>
            </div>
          )
      }

      <button className="lightBtn" onClick={() => changeSingleView({})}>Cancel</button>


    </div>
  )
}

export default SinglePostView;

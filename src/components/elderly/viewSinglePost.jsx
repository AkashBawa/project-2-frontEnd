import { useState } from "react";
import ViewProfile from "../common/ViewProfile";
import axios from "../../services/axios";
import { Modal } from "antd";
import { Button, notification } from 'antd';
import Swal from 'sweetalert2'

import AcceptImage from './../../public/icons/icon_accept.png';
import CancelImage from './../../public/icons/icon_cancel.png';
import ViewIcon from "./../../public/icons/view.png";

const SinglePostView = ({ currentPost, fetchMyPosts }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };


  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title, body) => {
    api.open({
      message: title,
      description:
        body,
      duration: 1,
    });
  };


  const viewProfile = (user) => {
    console.log(user);
    setViewUser(user);
    setIsModalOpen(true);
  }


  const responseInvitation = async ( acceptedUserId, status) => {
    try {

      Swal.fire({
        title: 'Warning',
        text: `Do you want to ${status} the invitation`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: "No",
      }).then(async (data) => {
        console.log(data)
        if(data.isConfirmed) {
          const postId = currentPost._id;
          const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);
          console.log(response);
          if(response && response.success) {
            Swal.fire({
              title: "Thanks",
              text: "The invitation status is updated",
              icon: "success"
            });
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

  return (

    <div className="singlePost" id="singlePost">
      {contextHolder}
      <Modal className="textAlignCenter" open={isModalOpen} footer={[]}  onCancel={() => setIsModalOpen(false)}>
        <ViewProfile user={viewUser}/>
      </Modal>
      

      <h1>{currentPost.serviceTitle}</h1>

      <h2>{currentPost.serviceType}</h2>

      <h3> Invitations </h3>
      <div className="invitations">
        {
          currentPost?.invitations.map((invite, invitationIndex) => {
            return (
              invite.status == "PENDING" &&
              (
                <div className="requestList" key={"invitation-" + invitationIndex}>
                  <span onClick={() => { viewProfile(invite.user) }}>By: {invite.user.name ? invite.user.name : invite.user.email} </span>
          
                  <div className="decisionButtons">
                    <span> <img src={AcceptImage} onClick={() => { responseInvitation( invite.user._id, "ACCEPTED") }} /> Accept </span>
                    <span> <img src={CancelImage} onClick={() => { responseInvitation( invite.user._id, "REJECTED") }} /> Reject </span>
                  </div>
                </div>
              )

            )
          })
        }
      </div>
    </div>
  )
}

export default SinglePostView;

import { useState } from "react";
import { Outlet, Link } from "react-router-dom"
import ViewProfile from "../common/ViewProfile";
import axios from "../../services/axios";
import { Modal } from "antd";
import { Button, notification } from 'antd';
import Swal from 'sweetalert2'
import AcceptImage from './../../public/icons/icon_accept.png';
import CancelImage from './../../public/icons/icon_cancel.png';
import ProfileImage from "./../../public/icons/profile.png";
import { useEffect } from "react";

const SinglePostView = ({ currentPost, fetchMyPosts, changeSingleView }) => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);
  // const [rating, setRating] = useState();
  // const [volProfile, setVolProfile] = useState({});

  // const [resolution, setResolution] = useState(null);

  // useEffect(() => {
  //   fetchRating();
  // }, []);


  // const fetchRating = async () => {
  //   try {
  //     let getrating = await axios.getRequest("averageRating", true);
  //     setRating(getrating[0].ratingAvg);
  //     console.log("Hello Rating: " + getrating);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(" Rating error ");
  //   }
  // }

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      if (getVolProfile) {
        // setVolProfile(getVolProfile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const responseInvitation = async (acceptedUserId, status, changeSingleView) => {
    try {
      Swal.fire({
        title: 'Confirmation',
        text: `Are you sure you want to  ${status === 'ACCEPTED' ? 'accept' : 'reject'} this service`,
        // icon: 'warning',
        showCancelButton: true,
        cancelButtonText: "No",
        confirmButtonText: 'Yes',
      }).then(async (data) => {

        if (data.isConfirmed) {
          const postId = currentPost._id;
          const response = await axios.putRequest("responseInvitation", { postId, acceptedUserId, status }, true);

          if (response && response.success) {
            Swal.fire({
              icon: "success",
              title: "Confirmation",
              text: "You have accepted this service",
              confirmButtonText: 'ok',
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

    setViewUser(user);
    setIsModalOpen(true);
  }

  return (

    <div className="ElderSinglePost" id="ElderSinglePost">
      <Modal className="textAlignCenter" open={isModalOpen} footer={[]} >
        <ViewProfile user={viewUser} />
        <h2 className="textAlignCenter textCapital">{currentPost.name}</h2>
        <p>Thank you for reviewing my profile</p>
        <button type="primary" className="darkBtn" onClick={handleOk}>Close</button>
      </Modal>
      <h1>Post Summary</h1>
      <div className="singlePostSummary">
        <p>{currentPost.serviceTitle}</p>
        <p>{currentPost.serviceType}</p>
        <p>{currentPost.time ? currentPost.time : currentPost.startTime} - {currentPost.endTime}</p>
        <p>{currentPost.address}</p>
      </div>
      {
        (currentPost?.invitations && currentPost.invitations.length > 0) ?
          (
            <div className="invitations">
              <h1>Post Invitations</h1>
              {
                currentPost?.invitations.map((invite, invitationIndex) => {
                  return (
                    // invite.status == "PENDING" &&
                    // (
                    <div className="requestList" key={"invitation-" + invitationIndex}>
                      <img src={invite.user.profilePhoto ? invite.user.profilePhoto : ProfileImage} alt="Volunteer Image" className="vimg" />
                      <div className="vsummary" id="volInlineText">
                        <p >Volunteer Name:  <span id="volNameOrange" onClick={() => { viewProfile(invite.user) }} > {invite.user.name ? invite.user.name : invite.user.email} </span></p>
                        <div className="inlineText">
                          <p>Volunteer Rating: {invite.user.point}</p>

                          {/* <p>Volunteer Rating: {rating ? parseFloat(rating.toFixed(2)) : 0}</p> */}
                          {/* <p>Volunteer Rating:  {volProfile ? volProfile.name : "No User"}</p> */}


                          {/* <h1 className="blackH1">{invite.user.rating ? invite.user.rating : "No Current Volunteer Rating"}</h1> */}
                        </div>
                      </div>

                      <div className="decisionButtons">
                        <span> <img src={AcceptImage} onClick={() => { responseInvitation(invite.user._id, "ACCEPTED") }} /> Accept </span>
                        <span> <img src={CancelImage} onClick={() => { responseInvitation(invite.user._id, "REJECTED") }} /> Reject </span>
                      </div>
                    </div>
                  )
                  // )
                })
              }
            </div>
          ) : (
            <div>
              <h2 className="noInvitations">This post does not have any active invitations</h2>
            </div>
          )
      }

      <button className="darkBtn" onClick={() => changeSingleView({})}>Cancel</button>


    </div >
  )
}

export default SinglePostView;

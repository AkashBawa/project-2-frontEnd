import { Card, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import { useState } from "react";
import MypostVolunteer from './MyPosts';
import SinglePostView from "./../elderly/SinglePostView";
import axios from "../../services/axios";
import { useEffect } from "react";
import localStorage from "../../services/localStorage";
import statusBar from './../../images/statusBar.png';
import wiseCareLogo from './../../images/wiseCareLogo.png';
import iconProfile from './../../images/vicon_profile.png';
import iconNotification from './../../images/icon_notification.png';
import iconNavProfile from './../../images/icon_profile_mobile.png';
import iconNavNotification from './../../images/icon_request_mobile.png';
// import rewards from './../../images/rewards.png';
import Bronze from '../../images/image-25.png'
import Silver from '../../images/image 24.png'
import Gold from '../../images/image 23.png'
import rewardIcon from './../../images/rewardIcon.png';
import apply from './../../images/apply.png';


import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';
import Swal from "sweetalert2";

const Dashboard = () => {
  const dispatch = useDispatch();

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  const [currentPost, setCurrentPost] = useState({});


  useEffect(() => {

    dispatch(setLoader({ loader: true }));
    fetchPost();
    fetchId();
    fetchVolUserProfile();
    // fetchMyPosts();

  }, []);


  const filterPosts = allPosts => {
    let pendingPosts = [];
    let approvedPosts = [];
    let completedPosts = [];

    allPosts.forEach((post, index) => {
      if (post.status === "PENDING") {
        pendingPosts.push(post);
      } else if (post.status === "BOOKED") {
        approvedPosts.push(post);
      } else {
        completedPosts.push(post);
      }
    });

    setPendingRequest(pendingPosts);
    setApprovedRequest(approvedPosts);
    setCompletedPosts(completedPosts);

    setPendingCounter(pendingPosts.length);
    setApprovedCounter(approvedPosts.length);
    setCompletedCounter(completedPosts.length);
  };

  const [formData, setFormData] = useState({
    profilePhoto: "",
    name: "",
    // lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    emergencyContact: ""
  });


  const fetchUserProfile = async () => {
    try {
      const getProfile = await axios.getRequest("user", true);
      setFormData(getProfile);

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const [volProfile, setVolProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [singleView, setSingleView] = useState(false);

  const fetchId = () => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
  }

  const fetchPost = async () => {
    try {
      const response = await axios.postRequest("fetchpost", {}, true);
      // const volActivePost = await axios.getRequest("postByVolunteer", true);

      dispatch(setLoader({ loader: false }));
      if (response && response.success) {
        setPosts(response.posts);
        setPendingCounter(response.posts.length)
      }

    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };



  const sendRequest = async (postId, index) => {
    try {

      Swal.fire({
        title: "Please confit",
        text: "Do you want to send the invitation"
        
      }).then( async (data) => {

        if(data.isConfirmed) {
          dispatch(setLoader({ loader: true }));
          const response = await axios.putRequest("sendInvitation", { postId }, true);
          dispatch(setLoader({ loader: false }));

          if (response.success == true) {
            let newPosts = [...posts];
            newPosts[index].invitations = response.updatePost.invitations;
            setPosts(newPosts);
          }
        }
        
      })
      
    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const volunteerName = volProfile ? volProfile.name : "Guest";


  return (
    <div id="volunteerDashboard">
      {
        singleView == false && (
          <div className="dashBoardVolunteer">
            <div className="dashBoardVolunteerHeader">
              <div>
                
                <h2>Hi, {volProfile ? volProfile.name : ""}</h2>
              </div>
              <div className="rewardPoints">
                <img src={rewardIcon} alt="reward" />
                <h2 className="pointsDash">Your Points: {volProfile?.point}</h2>
              </div>
            </div>
            <div className="dashVolunteerNav">
              <div className="dashVolunteerEvent">
                <h1>All Tasks</h1>
                <div className="allTasksCount">{pendingCounter}</div>
              </div>
              <div className="dashVolunteerUnanswered">
                <h1>Active Tasks</h1>
                <div className="activeTasks">{approvedCounter}</div>
              </div>
              <div className="dashVolunteerPending">
                <h1>Rewards</h1>
                {volProfile && (
                  <>
                    <img
                      src={
                        volProfile.point >= 400
                          ? Silver
                          : volProfile.point >= 200
                            ? Gold
                            : Bronze
                      }
                      alt="Rewards"
                    />
                  </>
                )}
                <h2>Next Medal:  6 / 15</h2>
              </div>
            </div>

            <div id="postsSection">
              <div id="postsSectionNav">
                <h1>My Tasks</h1>
              </div>

              <Tabs className="tabs"
                defaultActiveKey="1"
                type="card"
                size={"middle"}
                items={
                  [
                    {

                      label: `All Posts(${pendingCounter})`,
                      key: "1",
                      children: <MypostVolunteer posts={posts} fetchPost={fetchPost} sendRequest={sendRequest} />,
                    },
                    {
                      label: `Active Posts(${approvedCounter})`,
                      key: "2",
                      children: <MypostVolunteer posts={approvedPosts} fetchPost={fetchPost} />,
                    },
                    {
                      label: `History(${completedCounter})`,
                      key: "3",
                      children: <MypostVolunteer posts={completedPosts} fetchPost={fetchPost} />,
                    },
                  ]
                }
              />

            </div>
          </div>
        )
      }

      {
        singleView == true && (
          <div>
            <SinglePostView fetchPost={fetchPost} />
            {/* <SinglePostView currentPost={currentPost} fetchMyPosts={fetchMyPosts} /> */}

          </div>
        )
      }
      {/* <div className="list-posts">
        <Space direction="vertical">

          {
            posts.map((post, index) => {
              return (
                <Card
                  key={`card-${index}`}
                >
                  <div className="volPostCard">
                    <div className="servicePostDetails">
                      <div className="seniorProfilePhoto">
                        <Link to='/elder/profile'><img src={post?.userId.profilePhoto} alt="" /></Link>

                      </div>
                      <div >
                        <h1>{post.serviceTitle}</h1>
                        <Link to='/elder/profile'><h2 className="seniorProfileLink">{post?.userId.name}</h2></Link>
                        <h2>{post.address}</h2>
                        <h2>{new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()} at: {post.time}</h2>
                      </div>
                    </div>
                    <div className="responseButton">
                      {post.invitations.map((invite) => invite.user).indexOf(userId) > -1 ? (
                        <button type="default" disabled className="reviewButton">
                          Review</button>
                      ) : (

                        // apply

                        <button id="applyBtn" type="default"
                          onClick={() => {
                            // if (post.status === "PENDING") {
                              sendRequest(post._id, index);
                              // post.status = "BOOKED";
                            // }
                          }}>
                          <img src={apply} alt="" />
                        </button>
                      )}
                    </div>

                  </div>
                </Card>
              )
            })
          }
        </Space>
      </div> */}
    </div>


  )
}

export default Dashboard

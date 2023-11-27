import { Card, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import { useState } from "react";
import MyPosts from './../elderly/myPosts';
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



  // const fetchMyPosts = async () => {
  //   try {
  //     setSingleView(false);
  //     const response = await axios.getRequest("getPostByUser", true);
  //     dispatch(setLoader({ loader: false }))
  //     if (response.success === true && response.posts) {
  //       filterPosts(response.posts);
  //     }
  //   } catch (err) {
  //     dispatch(setLoader({ loader: false }))
  //     console.log(err)
  //   }
  // };

  const changeSingleView = (post) => {

    console.log("post is ");
    console.log(post)
    console.log("change view")
    setSingleView(!singleView);
    // setCurrentPost(post);
  }


  const [volProfile, setVolProfile] = useState(null);
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
      dispatch(setLoader({ loader: false }));
      if (response.success) {
        console.log(response.posts);
        setPosts(response.posts);
        console.log("Hi Ahmed it is working");
        // filterPosts(response.posts);

      }

    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };

  // const fetchPost = async () => {
  //   try {
  //     setSingleView(false);
  //     const response = await axios.getRequest("getPostByUser", true);
  //     dispatch(setLoader({ loader: false }))
  //     if (response.success === true && response.posts) {
  //       filterPosts(response.posts);
  //     }
  //   } catch (err) {
  //     dispatch(setLoader({ loader: false }))
  //     console.log(err)
  //   };


  const sendRequest = async (postId, index) => {
    try {
      const response = await axios.putRequest("sendInvitation", { postId }, true);
      if (response.success == true) {
        let newPosts = [...posts];
        newPosts[index].invitations = response.updatePost.invitations;
        setPosts(newPosts);
      }
    } catch (err) {
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
    <>
      {
        singleView == false && (
          <div className="dashBoardVolunteer">
            <nav>
              <img src={statusBar} alt="statusBar" id="statusBar" />
              <div>
                <img src={wiseCareLogo} alt="Logo" />
                <div className="navtopIcons">
                  <img src={iconNavNotification} alt="iconNavNotification" />
                  <Link to='/elder/profile'><img src={iconNavProfile} alt="iconNavProfile" /></Link>
                </div>
              </div>
            </nav>
            <div className="dashBoardVolunteerHeader">
              <h1>Hi, {volunteerName}</h1>
              <div className="rewardPoints">
                <img src={rewardIcon} alt="reward" />
                <h2 className="pointsDash">Your Points: {volProfile?.point}</h2>

              </div>
              <div className="topIconsVolunteer">
                <img src={iconNotification} alt="iconNotification" />
                <Link to='/volunteer/profile'><img src={iconProfile} alt="iconProfile" /></Link>
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
                      children: <MyPosts posts={pendingPosts} changeSingleView={changeSingleView} fetchPost={fetchPost} />,
                    },
                    {
                      label: `Active Posts(${approvedCounter})`,
                      key: "2",
                      children: <MyPosts posts={approvedPosts} changeSingleView={changeSingleView} fetchPost={fetchPost} />,
                    },
                    {
                      label: `History(${completedCounter})`,
                      key: "3",
                      children: <MyPosts posts={completedPosts} changeSingleView={changeSingleView} fetchPost={fetchPost} />,
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
      <div className="list-posts">
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

                        <button id="applyBtn" type="default" onClick={() => sendRequest(post._id, index)}>
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
      </div>
    </>


  )
}

export default Dashboard

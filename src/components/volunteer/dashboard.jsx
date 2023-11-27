import { Card, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';

// import "./../volunteer/css/dashboard.css"
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

import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';

const Dashboard = () => {

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  const dispatch = useDispatch();
  

  useEffect(() => {

    dispatch(setLoader({ loader: true }));
    fetchPost();
    fetchId();
    fetchVolUserProfile();
  }, []);

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
      }

    } catch (err) {
      dispatch(setLoader({ loader: false }));
      console.log(err)
    }
  };



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
  }


  const fetchMyPosts = async () => {
    try {
      setSingleView(false);
      const response = await axios.getRequest("getPostByUser", true);
      if (response.success === true && response.posts) {
        // filterPosts(response.posts);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const changeSingleView = (post) => {

    console.log("post is ");
    console.log(post)
    console.log("change view")
    setSingleView(!singleView);
    // setCurrentPost(post);
  }

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
    } catch (error) {
      console.log(error);
    }
  };

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
              <h1>Hi, Beant</h1>
              <div className="rewardPoints">
                <img src={rewardIcon} alt="reward" />
                <h2>Your Points: {volProfile?.point}</h2>

              </div>
              <div className="topIconsVolunteer">
                <img src={iconNotification} alt="iconNotification" />
                <Link to='/elder/profile'><img src={iconProfile} alt="iconProfile" /></Link>
              </div>
            </div>
            <div className="dashVolunteerNav">
              <div className="dashVolunteerEvent">
                <h1>All Tasks</h1>
                <div className="allTasksCount">{approvedCounter}</div>
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
                {/* <img src={rewards} alt="Rewards" /> */}
                <h2>Next Medal:  6 / 15</h2>
              </div>
            </div>

            <div className="deletePostConfirmation Visually-hidden ">
              <div>
                <h3>Are you sure you want to delete you post?</h3>
                <button className="deleteNo">No</button>
                <button className="deleteYes">Yes</button>
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
                      children: <MyPosts posts={pendingPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,
                    },
                    {
                      label: `Active Posts(${approvedCounter})`,
                      key: "2",
                      children: <MyPosts posts={approvedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,
                    },
                    {
                      label: `History(${completedCounter})`,
                      key: "3",
                      children: <MyPosts posts={completedPosts} changeSingleView={changeSingleView} fetchMyPosts={fetchMyPosts} />,
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
            <SinglePostView fetchMyPosts={fetchMyPosts} />
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
                  title={post.serviceTitle}
                  extra={
                    post.invitations.map((invite) => invite.user).indexOf(userId) > -1 ?
                      <Button type="default" disabled>Already send</Button> :
                      <Button type="default" onClick={() => { sendRequest(post._id, index) }}>Send Request</Button>
                  }
                  style={{
                    width: "100%",
                  }}

                >
                  <h1>{post.serviceTitle}</h1>
                  <h2>{post.address}</h2>
                  <h2>By: {post?.userId.name}</h2>
                  <h2>On: {new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()} at: {post.time}</h2>
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

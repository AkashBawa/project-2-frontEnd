import { Card, Space, Button } from "antd";
import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';

import "./dashboard.css"
import { useState } from "react";
import MyPosts from './../elderly/myPosts';
import SinglePostView from "./../elderly/viewSinglePost";
import axios from "../../services/axios";
import { useEffect } from "react";
import localStorage from "../../services/localStorage";
import statusBar from './../../images/statusBar.png';
import wiseCareLogo from './../../images/wiseCareLogo.png';
import iconProfile from './../../images/icon_profile.png';
import iconNotification from './../../images/icon_notification.png';
import iconNavProfile from './../../images/icon_profile_mobile.png';
import iconNavNotification from './../../images/icon_request_mobile.png';
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
  }, []);


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
        filterPosts(response.posts);
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
    setCurrentPost(post);
  }

  return (
    <>
    {
      singleView == false && (
        <div className="dashBoardElder">
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
          <div className="dashBoardElderHeader">
            <h1>Hi, Ana</h1>
            <div className="topIcons">
              <img src={iconNotification} alt="iconNotification" />
              <Link to='/elder/profile'><img src={iconProfile} alt="iconProfile" /></Link>
            </div>
          </div>
          <div className="dashElderNav">
            <div className="dashElderEvent">
              <h2>Join our Events</h2>
              <h4>Join us for our upcoming session.</h4>
              <button className="eventMore">Join</button>
            </div>
            <div className="dashElderUnanswered">
              <h3>Active Posts</h3>
              <div className="unansCount">{approvedCounter}</div>
            </div>
            <div className="dashElderPending">
              <h3>All Posts</h3>
              <div className="pendingCount">{pendingCounter}</div>
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
              <h1>My Posts</h1>
              <button id="createPost"><Link to='/elder/addPost'>Create Post</Link></button>
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
                    children: <MyPosts posts={pendingPosts} changeSingleView={changeSingleView}  fetchMyPosts={fetchMyPosts} />,
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
          <SinglePostView currentPost={currentPost} fetchMyPosts={fetchMyPosts} />
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
            title= {post.serviceTitle}
            extra={
              post.invitations.map((invite) => invite.user).indexOf(userId) > -1 ? 
              <Button type="default" disabled>Already send</Button> : 
              <Button type="default" onClick={() => {sendRequest(post._id, index)}}>Send Request</Button>
            }
            style={{
              width: "100%",
            }}

          >
            <p>Description</p>
            <p>By: {post?.userId.name}</p>
            <p>On: {new Date(post.date).getDate()}/{new Date(post.date).getMonth()}/{new Date(post.date).getFullYear()} at: {post.time}</p>
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

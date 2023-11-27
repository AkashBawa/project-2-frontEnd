import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import SinglePostView from "./SinglePostView";

import React, { useEffect, useState } from 'react';
// import './css/Dashboard.css'
import wiseCareLogo from './../../images/wiseCareLogo.png';
import iconProfile from './../../images/icon_profile.png';
import statusBar from './../../images/statusBar.png';
import axios from "../../services/axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setLoader } from '../../redux/user';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  const [singleView, setSingleView] = useState(false);
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    dispatch(setLoader({ loader: true }))
    fetchMyPosts();
    fetchUserProfile()
    
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

    // console.log(completedPosts);
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

  const fetchMyPosts = async () => {
    try {
      setSingleView(false);
      const response = await axios.getRequest("getPostByUser", true);
      dispatch(setLoader({ loader: false }))
      if (response.success === true && response.posts) {
        filterPosts(response.posts);
      }
    } catch (err) {
      dispatch(setLoader({ loader: false }))
      console.log(err)
    }
  };

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
            {/* <nav>
              <img src={statusBar} alt="statusBar" id="statusBar" />
              <div>
                <img src={wiseCareLogo} alt="Logo" />
                <div className="navtopIcons">
                  <Link to='/elder/profile'><img src={iconNavProfile} alt="iconNavProfile" /></Link>
                </div>
              </div>
            </nav> */}
            <div className="dashBoardElderHeader">
              <h1>Hi, {formData.name}</h1>
              <div className="topIcons">
                <Link to='/elder/profile'><img src={formData.profilePhoto} alt="iconProfile" /></Link>
              </div>
            </div>
            <div className="dashElderNav">
              <div className="dashElderEvent">
                <h2>Join our Events</h2>
                <h4>Join us for our upcoming session.</h4>
                <Link to='/elder/event'><button className="eventMore">Join</button></Link>

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

            <div className="deletePostConfirmation Visually-hidden">
              <div>
                <h3>Are you sure you want to delete you post?</h3>
                <button className="deleteNo">No</button>
                <button className="deleteYes">Yes</button>
              </div>
            </div>

            <div id="postsSection">
              <div id="postsSectionNav">
                <h1>My Posts</h1>
                <button id="createPost" onClick={() => { navigate("/elder/addPost") }}><Link to='/elder/addPost'>Create Post</Link></button>
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
            <SinglePostView currentPost={currentPost} fetchMyPosts={fetchMyPosts} />
          </div>
        )
      }
    </>
  );
}
export default Dashboard;

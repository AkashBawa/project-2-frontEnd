import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import React, { useEffect } from 'react';
import './css/Dashboard.css'
import wiseCareLogo from './../../images/wiseCareLogo.png';
import iconProfile from './../../images/icon_profile.png';
import iconNotification from './../../images/icon_notification.png';
import iconNavProfile from './../../images/icon_profile_mobile.png';
import iconNavNotification from './../../images/icon_request_mobile.png';
import statusBar from './../../images/statusBar.png';
import axios from "../../services/axios";
import { useState } from "react";

const Dashboard = () => {

  const [pendingPosts, setPendingRequest] = useState([]);
  const [approvedPosts, setApprovedRequest] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);

  const [pendingCounter, setPendingCounter] = useState(0);
  const [approvedCounter, setApprovedCounter] = useState(0);
  const [completedCounter, setCompletedCounter] = useState(0);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const filterPosts = (allPosts) => {

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
  }


  const fetchMyPosts = async () => {
    try {
      const response = await axios.getRequest("getPostByUser", true);
      if (response.success === true && response.posts) {
        filterPosts(response.posts);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="dashBoardElder">
      <nav className="dashNav">
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
                children: <MyPosts posts={pendingPosts} />,
              },
              {
                label: `Active Posts(${approvedCounter})`,
                key: "2",
                children: <MyPosts posts={approvedPosts} />,
              },
              {
                label: `History(${completedCounter})`,
                key: "3",
                children: <MyPosts posts={completedPosts} />,
              },
            ]
          }
        />

      </div>
    </div>


  )
}

export default Dashboard

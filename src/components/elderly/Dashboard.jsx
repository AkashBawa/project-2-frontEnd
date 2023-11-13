import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import React, { useEffect } from 'react';
import './css/Dashboard.css'
import iconProfile from './../../images/icon_profile.png';
import iconNotification from './../../images/icon_notification.png';
import iconAdd from './../../images/icon_add.png';
import axios from "../../services/axios";
import { useState } from "react";

const Dashboard = () => {

  const [ pendingPosts, setPendingRequest ] = useState([]);
  const [ approvedPosts, setApprovedRequest ] = useState([]);
  const [ completedPosts, setCompletedPosts ] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);


  const filterPosts = (allPosts) => {
    let pendingPosts = [];
    let approvedPosts = [];
    let completedPosts = [];

    allPosts.forEach((post, index) => {

      if( post.status === "PENDING" ) {
        pendingPosts.push(post)
      } else if (  post.status === "BOOKED"  ) {
        approvedPosts.push(post);
      } else {
        completedPosts.push(post);
      }
    });

    console.log(completedPosts)
    setPendingRequest(pendingPosts);
    setApprovedRequest(approvedPosts);
    setCompletedPosts(completedPosts);
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
          <div className="unansCount">0</div>
        </div>
        <div className="dashElderPending">
          <h3>All Posts</h3>
          <div className="pendingCount">0</div>
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
                label: `All Posts(3)`,
                key: "1",
                children: <MyPosts posts={pendingPosts} />,
              },
              {
                label: `Active Posts(2)`,
                key: "2",
                children: <MyPosts posts={approvedPosts} />,
              },
              {
                label: `History(2)`,
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

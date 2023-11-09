import { Outlet, Link } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';
import React from 'react';
import './css/Dashboard.css'
import iconProfile from './../../images/icon_profile.png';
import iconNotification from './../../images/icon_notification.png';
import iconAdd from './../../images/icon_add.png';

const Dashboard = () => {



  return (
    <div className="dashBoardElder">
      <div className="dashBoardElderHeader">
        <h1>Hi, Ana</h1>
        <div className="topIcons">
          <img src={iconNotification} alt="iconNotification" />
          <Link to='/elder/addPost'><img src={iconAdd} alt="iconAdd" /></Link>
          <Link to='/elder/profile'><img src={iconProfile} alt="iconProfile" /></Link>
        </div>
      </div>
      <div className="dashElderNav">
        <div className="dashElderEvent">
          <h2>Join our Community</h2>
          <h4>Join us for our upcoming yoga session.</h4>
          <button className="eventMore">Read More</button>
        </div>
        <div className="dashElderUnanswered">
          <h3>Unanswered</h3>
          <div className="unansCount">0</div>
        </div>
        <div className="dashElderPending">
          <h3>Pending</h3>
          <div className="pendingCount">0</div>
        </div>
      </div>

      <div id="postsSection">
        <h1>Posts</h1>

        <Tabs className="tabs"
          defaultActiveKey="1"
          type="card"
          size={"middle"}
          items={
            [
              {
                label: `Unanswered`,
                key: "1",
                children: <MyPosts />,
              },
              {
                label: `Pending`,
                key: "2",
                children: <MyPosts />,
              },
              {
                label: `Approved`,
                key: "3",
                children: <MyPosts />,
              },
              {
                label: `Completed`,
                key: "4",
                children: <MyPosts />,
              },
            ]
          }
        />

      </div>

    </div>


  )
}

export default Dashboard

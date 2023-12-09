import CreateEvent from "./CreateEvent";
import JoinEvent from "./JoinEvent";
import MyEvents from "./MyEvents";
import { Tabs } from 'antd';
import ringIcon from "./../../../images/notification-ringing.png";
import settingIcon from "./../../../images/settings.png";
import profileIcon from "./../../../images/icon_profile_elderly_dark.png";
import React, { useEffect, useState } from 'react';
import { Outlet, Link } from "react-router-dom"


const Events = () => {

    return (
        <div className="events">
            <div className="eventHeader">
                <h1>Join an Event</h1>
                {/* <div className="topIcons">
                    <img src={ringIcon} alt="notification icon" />
                    <img src={settingIcon} alt="Setting icon" />
                    <Link to='/elder/profile'><img src={profileIcon} alt="Setting icon" /></Link>
                </div> */}
            </div>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size={"middle"}
                items={
                    [
                        {
                            label: `My Events`,
                            key: "1",
                            children: <MyEvents />,
                        },
                        {
                            label: `Create Event`,
                            key: "2",
                            children: <CreateEvent />,
                        },
                        {
                            label: `Participate`,
                            key: "3",
                            children: <JoinEvent />,
                        },
                    ]
                }
            />
        </div>
    )
}

export default Events

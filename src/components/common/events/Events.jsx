import { useState } from "react";
import CreateEvent from "./CreateEvent";
import JoinEvent from "./JoinEvent";
import { Tabs } from 'antd';

import "./events.scss";

const Events = () => {

    console.log("event reached")
    return (
        <div className="events">
            <h2>Create Event</h2>
            <Tabs
                defaultActiveKey="1"
                type="card"
                size={"middle"}
                items={
                    [
                        {
                            label: `Create Event`,
                            key: "1",
                            children: <CreateEvent/>,
                        },
                        {
                            label: `Participate`,
                            key: "2",
                            children: <JoinEvent />,
                        },
                    ]
                }
            />
        </div>
    )
}

export default Events

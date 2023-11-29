import { useState } from "react";
import CreateEvent from "./CreateEvent";
import JoinEvent from "./JoinEvent";
import MyEvents from "./MyEvents";
import { Tabs } from 'antd';

const Events = () => {

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
                            label: `My Events`,
                            key: "1",
                            children: <MyEvents/>,
                        },
                        {
                            label: `Create Event`,
                            key: "2",
                            children: <CreateEvent/>,
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

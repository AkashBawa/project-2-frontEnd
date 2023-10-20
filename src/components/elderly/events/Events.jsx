import { useState } from "react";
import { Button } from 'antd';
import { Alert, Form, Input, DatePicker, TimePicker } from "antd";
import axios from "./../../../services/axios";

import "./events.scss";

const Events = () => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const reset = () => {

        setName("");
        setLocation("");
        setDate("");
        setStartTime("");
        setEndTime("");

    }

    const submit = async () => {
        try {
            const obj = {
                name,
                location,
                date,
                startTime,
                endTime
            }
            console.log("obj", obj)
            const response = await axios.postRequest("createEvent", obj, true);

            if (response && response.success) {
                alert("Event added successfully");
                reset();
            }

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="events">
            <h2>Create Event</h2>
            <div className="addpost">
                <Form
                    name="trigger"
                    style={{
                        maxWidth: 400,
                    }}
                    layout="vertical"
                    autoComplete="off"
                >
                    {/* <Alert message="Use 'max' rule, continue type chars to see it" /> */}

                    <Form.Item label="Name">
                        <Input placeholder="name" value={name}  onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Location" >
                        <Input placeholder="Location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Date">
                        <input type="date" value={date} onChange={(e) => { setDate(e.target.value) }} />
                    </Form.Item>
                    <Form.Item label="Select Start time">
                        <input type="time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required />
                    </Form.Item>

                    <Form.Item label="Select End time">
                        <input type="time" value={endTime} onChange={(e) => { setEndTime(e.target.value) }} required />
                    </Form.Item>

                    <Button type="primary" onClick={submit}>Submit</Button>
                </Form>

            </div>
        </div>
    )
}

export default Events

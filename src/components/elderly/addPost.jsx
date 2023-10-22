import { Alert, Form, Input, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from 'antd';
import axios from "../../services/axios";

const AddPost = () => {

  const [time, setTime] = useState();
  const [serviceTitle, setserviceTitle] = useState();
  const [serviceType, setserviceType] = useState();
  const [date, setdate] = useState();
  const [serviceStatus, setserviceStatus] = useState();

  const submit = async () => {
    console.log("submit", time, serviceTitle, serviceType, date, serviceStatus);

    const payload = {
      date,
      time,
      serviceTitle,
      serviceType,
      serviceStatus,
      "location": {
        "coordinates": [-122.778620, 49.163640]
      }
    }

    if (time && serviceTitle && serviceType && date && serviceStatus) {
      const response = await axios.postRequest("addpost", payload, true);
      console.log(response)
    }
  }
  return (
    <div>
      <h2>Add Post</h2>
      <div className="addpost">
        <Form
          name="trigger"
          style={{
            maxWidth: 400,
          }}
          layout="vertical"
          autoComplete="off"
        >

          <Form.Item label="Service title">
            <Input placeholder="Service title" onChange={(e) => { setserviceTitle(e.target.value) }} />
          </Form.Item>
          <Form.Item label="Service type" >
            <Input placeholder="Service type" onChange={(e) => { setserviceType(e.target.value) }} />
          </Form.Item>
          <Form.Item label="Date">
            <input type="date" onChange={(e) => { setdate(e.target.value) }} />
          </Form.Item>
          <Form.Item label="Select time">
            <input type="time" onChange={(e) => { setTime(e.target.value) }} required />
          </Form.Item>

          <Button type="primary" onClick={() => {
            // setserviceStatus("good");
            submit();
          }}>Submit</Button>

        </Form>

      </div>
    </div>
  )
}

export default AddPost

import { Alert, Form, Input, DatePicker, TimePicker } from "antd";
import { useState } from "react";
import { Button } from "antd";
import axios from "../../services/axios";
import TomTomAutoComplete from "../map/TomTomAutoComplete";

const AddPost = () => {
  const [time, setTime] = useState();
  const [serviceTitle, setserviceTitle] = useState();
  const [serviceType, setserviceType] = useState();
  const [date, setdate] = useState();

  const submit = async () => {
    console.log("submit", time, serviceTitle, serviceType, date);

    const payload = {
      date,
      time,
      serviceTitle,
      serviceType,
      location: {
        coordinates: [-122.77862, 49.16364]
      }
    };

    if (time && serviceTitle && serviceType && date) {
      const response = await axios.postRequest("addpost", payload, true);
      console.log(response);
    }
  };
  return (
    <div>
      <h2>Add post</h2>
      <div className="addpost">
        <Form
          name="trigger"
          style={{
            maxWidth: 400
          }}
          layout="vertical"
          autoComplete="off"
        >
          {/* <Alert message="Use 'max' rule, continue type chars to see it" /> */}
          <Form.Item label="Service title">
            <Input
              placeholder="Service title"
              onChange={e => {
                setserviceTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Service type">
            <Input
              placeholder="Service type"
              onChange={e => {
                setserviceType(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Date">
            <input
              type="date"
              onChange={e => {
                setdate(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Select time">
            <input
              type="time"
              onChange={e => {
                setTime(e.target.value);
              }}
              required
            />
          </Form.Item>

          {/* map */}

          <TomTomAutoComplete />

          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;

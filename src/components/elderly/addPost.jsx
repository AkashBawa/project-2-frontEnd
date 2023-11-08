import { Alert, Form, Input, DatePicker, TimePicker, notification } from "antd";
import { useState } from "react";
import { Button } from "antd";
import axios from "../../services/axios";
import TomTomAutoComplete from "../map/TomTomAutoComplete";

const AddPost = (userName) => {
  const [api, contextHolder] = notification.useNotification();
  const [time, setTime] = useState();
  const [serviceTitle, setserviceTitle] = useState();
  const [serviceType, setserviceType] = useState();
  const [date, setdate] = useState();

  const resetForm = () => {
    setTime("");
    setdate("");
    setserviceTitle("");
    setserviceType("");
  };

  const openNotification = (message, description = "") => {
    api.open({
      message: message,
      description: description,
      duration: 1
    });
  };

  const submit = async () => {
    console.log("submit", time, serviceTitle, serviceType, date);

    const payload = {
      date,
      time,
      serviceTitle,
      serviceType,
      location: {
        coordinates: [-122.77862, 49.16364]
      },
      userName: userName, // Include the user's name in the post
    };

    if (time && serviceTitle && serviceType && date) {
      const response = await axios.postRequest("addpost", payload, true);
      // console.log(response);
      if (response && response.success) {
        openNotification("Post added successfully");
      }
      resetForm();
    }
  };
  return (
    <div id="addPost">
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
          <Form.Item label="Service title">
            <Input
              placeholder="Service title"
              value={serviceTitle}
              onChange={e => {
                setserviceTitle(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Service type">
            <Input
              placeholder="Service type"
              value={serviceType}
              onChange={e => {
                setserviceType(e.target.value);
              }}
            />
          </Form.Item>
          <div className="bottomPart">
            <div className="bottomLeft">
              <Form.Item label="Date">
                <input
                  type="date"
                  value={date}
                  onChange={e => {
                    setdate(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="Select time">
                <input
                  type="time"
                  value={time}
                  onChange={e => {
                    setTime(e.target.value);
                  }}
                  required
                />
              </Form.Item>
            </div>

            {/* map */}
            <div className="mapbox">
              <TomTomAutoComplete />
            </div>
          </div>
          <Button type="primary" onClick={submit}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;

import { Alert, Form, Input, DatePicker, TimePicker, notification } from "antd";
import { useState } from "react";
import { Button } from "antd";
import axios from "../../services/axios";
import TomTomAutoComplete from "../map/TomTomAutoComplete";
import { useDispatch } from "react-redux";
import { setLoader } from './../../redux/user';
import Swal from 'sweetalert2'

const AddPost = (userName) => {

  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [serviceTitle, setserviceTitle] = useState();
  const [serviceType, setserviceType] = useState();
  const [date, setdate] = useState();
  const [coordinates, setCoordinates] = useState([]);
  const [location, setLocation] = useState("");

  const resetForm = () => {
    setStartTime("");
    setEndTime("");
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
  
  const updateLocationAnsCoordinates = ( location, coordinates) => {
    console.log(location, coordinates);
    setLocation(location);
    setCoordinates(coordinates);
  }

  const submit = async () => {
    console.log("submit", startTime, endTime, serviceTitle, serviceType, date);

    const payload = {
      date,
      // startTime,
      time: startTime,
      endTime,
      serviceTitle,
      serviceType,
      address: location,
      location: {
        coordinates: coordinates
      }
    };

    if (endTime && startTime && serviceTitle && serviceType && date) {

      dispatch(setLoader({ loader: true }));

      try {
        const response = await axios.postRequest("addpost", payload, true);
        setTimeout(() => {
          dispatch(setLoader({ loader: false }));
        }, 500);
        if (response && response.success) {
          resetForm();
          Swal.fire({
            title: "Thanks",
            text: "Your post has successfully created",
            icon: "success"
          });
        }
      } catch (err) {
        dispatch(setLoader({ loader: false }));
      }

      
    } else {
      openNotification("Fill all the details");
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

              <Form.Item label="Start Time">
                <input
                  type="time"
                  value={startTime}
                  onChange={e => {
                    setStartTime(e.target.value);
                  }}
                  required
                />
              </Form.Item>

              <Form.Item label="End Time">
                <input
                  type="time"
                  value={endTime}
                  onChange={e => {
                    setEndTime(e.target.value);
                  }}
                  required
                />
              </Form.Item>

            </div>

            {/* map */}
            <div className="mapbox">
              <TomTomAutoComplete updateLocationAnsCoordinates={updateLocationAnsCoordinates} />
            </div>
          </div>
          <button type="primary" className="darkBtn" onClick={submit}>
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddPost;

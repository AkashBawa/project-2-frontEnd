import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
// import "./css/Profiles.css";
import { Alert, Select, Form, Input, DatePicker, TimePicker } from "antd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const Profiles = () => {
  const { TextArea } = Input;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [myPhoto, setPhoto] = useState("");

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );

  const [formData, setFormData] = useState({
    profilePhoto: "",
    name: "",
    // lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    emergencyContact: ""
  });

  const [profile, setProfile] = useState({});

  const fetchUserProfile = async () => {
    try {
      const getProfile = await axios.getRequest("user", true);
      setProfile(getProfile);
      setFormData(getProfile);
      if (getProfile.profilePhoto) {
        var file = dataURLtoFile(getProfile.profilePhoto, "photo")
        file.originFileObj = file

        setFileList([file])
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (fileList && fileList.length) {
      formData.profilePhoto = await getBase64(fileList[0].originFileObj);
    }

    try {
      const response = await axios.postRequest("updateProfile", formData, true);

      fetchUserProfile();
    } catch (error) {
      console.error("Form submission error:", error);
    }

    fetchUserProfile();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div id="profilePage">
      <h2>Hi, {formData.name}</h2>
      <div className="interestDiv">
        <Upload
          className="userImage"
          beforeUpload={file => {
            return false;
          }}
          listType="picture-circle"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea doloremque eveniet unde fugiat velit sunt nihil architecto dignissimos aspernatur quibusdam dolore cum sit nobis praesentium, totam repellendus ducimus incidunt optio!</p> */}
      </div>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          className="image"
          alt="example"
          style={{
            width: "100%"
          }}
          src={myPhoto}
        />
      </Modal>

      {/* <div className="displayProfile">
        <h2>User Profile</h2>
        <p>Name: {profile.name}</p>
        <p>Age: {profile.age}</p>
        <p>Gender: {profile.gender}</p>
        <p>Contact Number: {profile.contactNumber}</p>
        <p>Interest: {profile.interest}</p>
        <p>Emergency Contact: {profile.emergencyContact}</p>
      </div> */}

      <Form
        name="trigger"
        style={{
          maxWidth: 400
        }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item label="Name">
          <Input
            placeholder="NAME"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Age">
          <Input
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Contact Number">
          <Input
            placeholder="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="interest">
          <TextArea
            rows={6}
            placeholder="Interest"
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
          />
        </Form.Item>


        <Form.Item label="Gender">
  <Select
    defaultValue="lucy"
    style={{
      width: 120,
    }}
    onChange={(value) => handleInputChange({ target: { name: 'gender', value } })}
    value={formData.gender}
    options={[
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'prefered',
        label: 'Prefered',
      },
    ]}
  />
</Form.Item>


        {/* <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefered">Prefer not to say</option>
        </select> */}

        <Form.Item label="Emergency Contact">
          <Input
            placeholder="Service type"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Profiles;

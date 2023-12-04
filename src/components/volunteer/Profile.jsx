import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { Input, Select, Form, Upload, Button, Popover} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Rate } from 'antd';
import Edit from "../../images/danger.png"


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



const Profile = () => {

  const { TextArea } = Input;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [myPhoto, setPhoto] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formDataVol, setFormDataVol] = useState({
    profilePhoto: "",
    name: "",
    lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    eContact: "",
  });

  const [volProfile, setVolProfile] = useState({});
  const [rating, setRating] = useState()
  const [points, setPoints] = useState([])

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

  const content = (
    <div>
      <p>This is a Average Rating out of 5</p>
    </div>
  );

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

  const [profile, setProfile] = useState({});

  const fetchRating = async () => {
    try {
      let getrating = await axios.getRequest("averageRating", true);
      setRating(getrating[0].ratingAvg);

    } catch (error) {
      console.log(error);
    }
  }



  const fetchReview = async () => {
    try {
      const response = await axios.getRequest("getReview", true);

      if (response.data && response.data.review) {
        setPoints(response.data.review);
      } else {
      }
    } catch (error) {
      console.log("Error fetching review:", error);
    }
  };




  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
      setFormDataVol(getVolProfile);
      if (getVolProfile.profilePhoto) {
        var file = dataURLtoFile(getVolProfile.profilePhoto, "photo")
        file.originFileObj = file

        setFileList([file])
      }
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchVolUserProfile();
    fetchRating()
    fetchReview()
  }, []);


  // const toBase64 = (file) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = reject;
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fileList && fileList.length) {
      formDataVol.profilePhoto = await getBase64(fileList[0].originFileObj);
    }
    try {

      const responsee = await axios.postRequest("updateProfile", formDataVol, true);
      // fetchVolUserProfile();



      let obj = { ...formDataVol };
      if (selectedImage) {
        obj.profilePhoto = selectedImage;
      }
      const response = await axios.postRequest(
        "updateProfileVol",
        obj,
        true
      );


      setFormDataVol({
        name: "",
        lName: "",
        age: "",
        gender: "",
        contactNumber: "",
        interest: "",
        eContact: "",
      });

      fetchVolUserProfile();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormDataVol({
      ...formDataVol,
      [name]: value,
    });
  };

  // const imageChange = async (img) => {
  //   const base64I = await toBase64(img);
  //   setSelectedImage(base64I);
  // }

  return (
    <div id="profilePage">
      <h2>Hi, {volProfile.name}</h2>
      <div className="interestDiv">
        <Upload
          className="userImage"
          beforeUpload={file => {
            return false;
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <div>
          <Form.Item className="intesrestForm">

            <TextArea rows={5}
              id="interest"
              type="text"
              name="interest"
              value={formDataVol.interest}
              onChange={handleInputChange}
            />
          </Form.Item>

          <div className="rateClass">
           
            <Rate allowHalf value={rating ? parseFloat(rating.toFixed(2)) : 0} />
          <Popover content={content} title="Rating" trigger="hover">
            <img className="excla" src={Edit} alt="" />
          </Popover>
          </div>
        </div>
      </div>

      <div className="volrate">

        {/* {
          selectedImage == null && (
            <div className="take-image">
              <input type="file" name="eventImage" onChange={(e) => {
                setSelectedImage(imageChange(e.target.files[0]))
              }} />
            </div>
          )
        } */}
        {/* {
          selectedImage && (
            <div>
              <img
                className="volProfile"
                alt="Event Image"
                width={"250px"}
                src={selectedImage}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
            
            
          )
        } */}

        {/* <div className="ratingDivv">
          <div className="displayProfile">
            {volProfile ? (
              <div>

                <p>Rating: {rating ? rating.toFixed(2) : 'N/A'}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <Rate allowHalf value={rating ? parseFloat(rating.toFixed(2)) : 0} /></div> */}

      </div>
      {/* <h1>Volenteer Profile</h1> */}

      <br />

      <Form
        name="trigger"
        style={{
          maxWidth: 400
        }}
        layout="vertical"
        autoComplete="off"
      // onSubmit={handleSubmit}
      >
        <Form.Item label="Name">
          {/* <label htmlFor="name">Name</label> */}
          <Input
            id="name"
            type="text"
            name="name"
            value={formDataVol.name}
            onChange={handleInputChange}
          />
        </Form.Item>

        <Form.Item label="Age">
          {/* <label htmlFor="age">Age</label> */}
          <Input
            id="age"
            type="number"
            name="age"
            value={formDataVol.age}
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
            value={formDataVol.gender}
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
        {/* 
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formDataVol.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefered">Prefer not to say</option>
        </select> */}


        <Form.Item label="Contact Number">
          <Input
            id="contactNumber"
            type="tel"
            name="contactNumber"
            value={formDataVol.contactNumber}
            onChange={handleInputChange}
          />
        </Form.Item>

        {/* <Form.Item>
          <label htmlFor="interest">Interest</label>
          <TextArea rows={7}
            id="interest"
            type="text"
            name="interest"
            value={formDataVol.interest}
            onChange={handleInputChange}
          />
        </Form.Item> */}

        <input className="darkBtn" type="submit" value="Submit" onClick={handleSubmit} />
      </Form>


      {/* </form> */}


      {/* <div className="displayProfile">
        {volProfile ? (
          <div>
        
      <p>Rating: {rating ? rating.toFixed(2) : 'N/A'}</p> 
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <Rate allowHalf value={rating ? parseFloat(rating.toFixed(2)) : 0} /> */}

    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios";
import { Input, Select, Form } from "antd";

const Profile = () => {

  const { TextArea } = Input;

  const [selectedImage, setSelectedImage] = useState(null);
  const [formDataVol, setFormDataVol] = useState({
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

  const fetchRating = async () => {
    try {
      let getrating = await axios.getRequest("averageRating", true);
      setRating(getrating[0].ratingAvg);
      console.log(rating)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchReview = async () => {
    try {
      const response = await axios.getRequest("getReview", true);

      if (response.data && response.data.review) {
        setPoints(response.data.review);
        console.log("Review:", points);
      } else {
        console.log("Review data not found in the response.");
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
        setSelectedImage(getVolProfile.profilePhoto)
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


  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      let obj = { ...formDataVol };
      if (selectedImage) {
        obj.profilePhoto = selectedImage;
      }
      console.log(obj)
      const response = await axios.postRequest(
        "updateProfileVol",
        obj,
        true
      );


      console.log("Form submission successful:", response.data);
      console.log(response);


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
    console.log(formDataVol);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormDataVol({
      ...formDataVol,
      [name]: value,
    });
  };

  const imageChange = async (img) => {
    const base64I = await toBase64(img);
    setSelectedImage(base64I);
  }

  return (
    <div>

      <>
        <h1>Hi, {volProfile.name}</h1>
        {
          selectedImage == null && (
            <div className="take-image">
              <input type="file" name="eventImage" onChange={(e) => {
                setSelectedImage(imageChange(e.target.files[0]))
              }} />
            </div>
          )
        }
        {
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
        }
      </>
      {/* <h1>Volenteer Profile</h1> */}

<br />

      <Form
        name="trigger"
        style={{
          maxWidth: 400
        }}
        layout="vertical"
        autoComplete="off"
        onSubmit={handleSubmit}
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

        <Form.Item>
          <label htmlFor="interest">Interest</label>
          <TextArea  rows={7}
            id="interest"
            type="text"
            name="interest"
            value={formDataVol.interest}
            onChange={handleInputChange}
          />
        </Form.Item>

        <input className="darkBtn" type="submit" value="Submit" onClick={handleSubmit} />
      </Form>


      {/* </form> */}


      <div className="displayProfile">
        {volProfile ? (
          <div>
        
      <p>Rating: {rating ? rating.toFixed(2) : 'N/A'}</p> 
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>

    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";

import axios from "../../services/axios";

const Profile = () => {
  const [formDataVol, setFormDataVol] = useState({
    name: "",
    lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    eContact: "",
  });

  const [volProfile, setVolProfile] = useState();
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
      setPoints(response.data);
      console.log(points); 
    } catch (error) {
      console.log(error);
    }
  }
  
  

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
      console.log(volProfile)
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchVolUserProfile();
    fetchRating()
    fetchReview()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.postRequest(
        "updateProfileVol",
        formDataVol,
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

  return (
    <div>
      <h1>Elderly Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formDataVol.name}
          onChange={handleInputChange}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={formDataVol.age}
          onChange={handleInputChange}
        />

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
        </select>

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          id="contactNumber"
          type="tel"
          name="contactNumber"
          value={formDataVol.contactNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="interest">Interest</label>
        <input
          id="interest"
          type="text"
          name="interest"
          value={formDataVol.interest}
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form>

      <div className="displayProfile">
      {volProfile ? (
    <div>
      <p>Name: {volProfile.name}</p>
      <p>Age: {volProfile.age}</p>
      <p>Gender: {volProfile.gender}</p>
      <p>Contact Number: {volProfile.contactNumber}</p>
      <p>Interest: {volProfile.interest}</p>
      <p>rating average:{rating}</p>
      <p>Rewards Points: {volProfile.point}</p>

    </div>
  ) : (
    <p>Loading...</p>
  )}
      </div>
      
    </div>
  );
};

export default Profile;

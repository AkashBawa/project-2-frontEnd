import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import "./Profiles.css";
import { Alert, Select, Form, Input, DatePicker, TimePicker } from "antd";
import { Button } from "antd";

const Profiles = () => {
  const [formData, setFormData] = useState({
    name: "",
    lName: "",
    age: "",
    gender: "male",
    contactNumber: "",
    interest: "",
    emergencyContact: "",
  });

  const [profile, setProfile] = useState({});

  const fetchUserProfile = async () => {
    try {
      const getProfile = await axios.getRequest("user", true);
      setProfile(getProfile); // Set the user profile data in the state
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    // Fetch user profile data when the component mounts
    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.postRequest("updateProfile", formData, true);

      // Handle success, e.g., show a success message to the user

      console.log("Form submission successful:", response.data);
      console.log(response);

      // Optionally, you can reset the form fields
      setFormData({
        name: "",
        lName: "",
        age: "",
        gender: "",
        contactNumber: "",
        interest: "",
        emergencyContact: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
    }
    console.log(formData);
    console.log(profile);

    fetchUserProfile();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  return (
    <div>
      {/* <h1>Elderly Profile</h1>
      <form className="elderFrom" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
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
          value={formData.contactNumber}
          onChange={handleInputChange}
        />

        <label htmlFor="interest">Interest</label>
        <input
          id="interest"
          type="text"
          name="interest"
          value={formData.interest}
          onChange={handleInputChange}
        />

        <label htmlFor="emergencyContact">Emergency Contact</label>
        <input
          id="emergencyContact"
          type="number"
          name="emergencyContact"
          value={formData.emergencyContact}
          onChange={handleInputChange}
        />

        <input type="submit" value="Submit" />
      </form> */}

      <div className="displayProfile">
        <h2>User Profile</h2>
        <p>Name: {profile.name}</p>
        <p>Age: {profile.age}</p>
        <p>Gender: {profile.gender}</p>
        <p>Contact Number: {profile.contactNumber}</p>
        <p>Interest: {profile.interest}</p>
        <p>Emergency Contact: {profile.emergencyContact}</p>
      </div>

      <Form
        name="trigger"
        style={{
          maxWidth: 400,
        }}
        layout="vertical"
        autoComplete="off"
      >
        <Form.Item label="Name">
          <Input
            placeholder="Service title"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Age">
          <Input
            placeholder="Service type"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="Contact Number">
          <Input
            placeholder="Service type"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item label="interest">
          <Input
            placeholder="Service type"
            name="interest"
            value={formData.interest}
            onChange={handleInputChange}
          />
        </Form.Item>

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="prefered">Prefer not to say</option>
        </select>

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

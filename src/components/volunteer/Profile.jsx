import React, { useState } from 'react';

import axios from '../../services/axios';

const Profile = () => {

    const [formDataVol, setFormDataVol] = useState({
      name: '',
      lName: '',
      age: '',
      gender: '',
      contactNumber: '',
      interest: '',
      eContact: '',
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.postRequest('updateProfileVol', formDataVol, true);

      // Handle success, e.g., show a success message to the user
      console.log('Form submission successful:', response.data);
      console.log(response)

      // Optionally, you can reset the form fields
      setFormDataVol({
        name: '',
        lName: '',
        age: '',
        gender: '',
        contactNumber: '',
        interest: '',
        eContact: '',
      });
    } catch (error) {
      
      console.error('Form submission error:', error);
    }
    console.log(formDataVol)
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
    </div>
  )
}

export default Profile

import React, { useState } from 'react';
import axios from 'axios';


const Profiles = () => {


  const [formData, setFormData] = useState({
    name: '',
    lName: '',
    age: '',
    gender: 'male', // Default value
    contactNumber: '',
    interest: '',
    eContact: '',
  });

  
    return (
      <div>
          <h1>Elderly Profile</h1>
          <form action="post">
    <label htmlFor="name">Name</label>
    <input id="name" type="text" />

    <label htmlFor="lName">Last Name</label>
    <input id="lName" type="text" />

    <label htmlFor="age">Age</label>
    <input id="age" type="number" />

    <label htmlFor="gender">Gender</label>
    <select name="gender" id="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="prefered">Prefer not to say</option>
    </select>

    <label htmlFor="contactNumber">Contact Number</label>
    <input id="contactNumber" type="tel" />

    <label htmlFor="interest">Interest</label>
    <input id="interest" type="text" />

    <label htmlFor="eContact">Emergency Contact</label>
    <input type="tel" name="emergency_contact" id="eContact" />

    <input type="submit" />
</form>

  
      </div>
    )
  }
  
  export default Profiles
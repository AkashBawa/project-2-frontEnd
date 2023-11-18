import { useState } from "react";
import AxiosService from "./../../services/axios"
import localStorage from "../../services/localStorage";
import { useNavigate } from "react-router-dom";
// import AddPost from "./../elderly/addPost";
import IconLogo from "./../../images/logo.png";
import SignupImg from '../../images/group-seniors-park 1.png'
import React from 'react';
import { Input } from 'antd';
import { Select } from 'antd';
import { Link } from "react-router-dom";


function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [role, setRole] = useState();
  const [userName, setuserName] = useState();

  const submit = async () => {
    console.log(email);
    console.log(password);

    const data = await AxiosService.postRequest('signup', { email, password, role, userName });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if (data.role == "elder") {
        navigate('/elder/profile')
      } else {
        navigate('/volunteer/profile')
      }
    }

  }

  return (
    <div className="Signup">

      <nav>
        <div className="signupHeader">
          <img src={IconLogo} alt="" />
          <div className="headerLinks">
            <li><a href="">Contact</a></li>
            <Link to="/login"><button className="darkBtn">Login</button></Link>
          </div>
        </div>
      </nav>


      <div className="main">
        <img className="signupImg" src={SignupImg} alt="" />


        <div className="formDiv">
          <h2>Signup</h2>
          <div className="signupForm">
            <label htmlFor="email">Email</label>
            <Input id="email" placeholder="email" onKeyUp={(e) => { setEmail(e.target.value) }} />
            <label htmlFor="Password">Password</label>
            <Input type="password" onKeyUp={(e) => { setPassWord(e.target.value) }} id="Password" placeholder="Password" />
            <label htmlFor="role">role</label>
            <Input onKeyUp={(e) => { setRole(e.target.value) }} id="role" placeholder="role" />
            <label htmlFor="userName">userName</label>
            <Input onKeyUp={(e) => { setuserName(e.target.value) }} id="userName" placeholder="userName" />
            <div className="btnDivSignUp">
              <button className="darkBtn" onClick={submit}>Submit</button>
              <button className="darkBtn" onClick={submit}>Cancel</button>
            </div>
          </div>
          <h2 id="loginUser">Already A User</h2>
          <Link to="/login"><button className="darkBtn">Login</button></Link>

        </div>



        {/* <AddPost userName={userName} /> */}
      </div>

    </div>
  );
}

export default Signup;
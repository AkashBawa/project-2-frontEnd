import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconLogo from "./../../images/logo.png";
import localStorage from "../../services/localStorage";
import axios from "../../services/axios";
import SignupImg from '../../images/group-seniors-park 1.png'

import { Input } from 'antd';

function Login() {

  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const navigate = useNavigate();

  const submit = async () => {
    console.log(email);
    console.log(passWord);
    const data = await axios.postRequest("login", { email, password: passWord });
    if (data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);
      if (data.role == "elder") {
        navigate('/elder/dashboard')
      } else {
        navigate('/volunteer/dashboard')
      }
    }


  }

  return (
    <div className="Login">


      <nav>
        <div className="signupHeader">
          <img src={IconLogo} alt="" />
          <div className="headerLinks">
            <li><a href="">Contact</a></li>
            <button className="darkBtn">Sign Up</button>
          </div>
        </div>
      </nav>


      <div className="main">
        <img src={SignupImg} alt="" />
        <div className="signupForm">
          <h2>Login</h2>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            placeholder="email"
            onKeyUp={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label htmlFor="Password">Password</label>
          <Input
            onKeyUp={(e) => {
              setPassWord(e.target.value);
            }}
            id="Password"
            placeholder="Password"
            type="password"
          />
          <button className="darkBtn" type="default" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

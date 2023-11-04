import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import localStorage from "../../services/localStorage";
import axios from "../../services/axios";

function Login() {

    const [email, setEmail] = useState();
    const [passWord, setPassWord] = useState();
    const navigate = useNavigate();

    const submit = async () => {
        console.log(email);
        console.log(passWord);
        const data = await axios.postRequest("login",{email, password: passWord});
        if(data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.role);
          localStorage.setItem('userId', data.userId);
          if(data.role == "elder") {
            navigate('/elder/dashboard')
          } else {
            navigate ('/volunteer/dashboard')
          }
        }
        

    }
  
  return (
    <div className="Login">
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="email"
          onKeyUp={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="Password">Password</label>
        <input
          onKeyUp={(e) => {
            setPassWord(e.target.value);
          }}
          id="Password"
          placeholder="Password"
          type="password"
        />
      </div>

      <Button type="default" onClick={submit}>
        Submit
      </Button>
    </div>
  );
}

export default Login;

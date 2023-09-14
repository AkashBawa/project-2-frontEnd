import { useState } from "react";
import axios from "../../services/axios";

function Login() {

    const [email, setEmail] = useState();
    const [passWord, setPassWord] = useState();

    const submit = async () => {
        console.log(email);
        console.log(passWord);
        const data = await axios.postRequest("login",{email, password: passWord});
        console.log(data);
    }
    return (
      <div className="Login">
        <h2>Login</h2>
        <div> 
            <label htmlFor="email">Email</label> 
            <input id="email" placeholder="email" onKeyUp={(e) => {setEmail(e.target.value)}}/>
        </div>

        <div> 
            <label htmlFor="Password">Password</label> 
            <input onKeyUp={(e) => { setPassWord(e.target.value) }} id="Password" placeholder="Password"/>
        </div>

        <button onClick={submit}>Submit</button>
      </div>
    );
  }
  
  export default Login;
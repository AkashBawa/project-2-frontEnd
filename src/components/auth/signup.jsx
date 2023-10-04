import { useState } from "react";
import AxiosService from "./../../services/axios"
import localStorage from "../../services/localStorage";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassWord] = useState();
  const [role, setRole] = useState();
  const [userName, setuserName] = useState();

  const submit = async () => {
    console.log(email);
    console.log(password);

    const data = await AxiosService.postRequest('signup', {email, password, role, userName});
    if(data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      if(data.role == "elder") {
        navigate('/elder/profile')
      } else {
        navigate ('/volunteer/profile')
      }
    }
    
  }

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <div> 
          <label htmlFor="email">Email</label> 
          <input id="email" placeholder="email" onKeyUp={ (e) => { setEmail(e.target.value)}}/>
      </div>

      <div> 
          <label htmlFor="Password">Password</label> 
          <input onKeyUp={(e) => { setPassWord(e.target.value) }} id="Password" placeholder="Password"/>
      </div>

      <div> 
          <label htmlFor="role">role</label> 

          <input onKeyUp={(e) => { setRole(e.target.value) }} id="role" placeholder="role"/>
      </div>

      <div> 
          <label htmlFor="userName">userName</label> 
          <input onKeyUp={(e) => { setuserName(e.target.value) }} id="userName" placeholder="userName"/>
      </div>


      <button onClick={submit}>Submit</button>
    </div>
  );
}
  
export default Signup;
import { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import IconLogo from "./../../images/logo.png";
import localStorage from "../../services/localStorage";
import axios from "../../services/axios";
import SignupImg from '../../images/Mask group.png'
import { Link } from "react-router-dom";
import { setLoader } from '../../redux/user';
import { FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";

import { Input } from 'antd';
import swal from "sweetalert2";

function Login() {

  const [email, setEmail] = useState();
  const [passWord, setPassWord] = useState();
  const navigate = useNavigate();
  const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

  const submit = async () => {
    setLoader(true);
    const data = await axios.postRequest("login", { email, password: passWord });
    setLoader(false);
    if (data && data.success) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userId', data.userId);
      if (data.role == "elder") {
        navigate('/elder/dashboard')
      } else {
        navigate('/volunteer/dashboard')
      }
    } else {
      swal.fire({
          title: "Something went wrong",
          text: "Your email or password is incorrect",
          icon: "waring",
      })
    }

  }

  return (
    <div id='landingpage' className="login">


<header className="">
                <div className="container">
                    <a href="#" className="branding">
                        <img src={IconLogo} alt="Description of the image" />
                    </a>
                    {/* <ul className="main-menu">
                        <li>
                            <a href="#">Seniors</a>
                        </li>
                        <li>
                            <a href="#">Volunteers</a>
                        </li>
                        <li>
                            <a href="#">Events</a>
                        </li>
                        <li>
                            <a href="#">Contact</a>
                        </li>
                    </ul> */}
                    <div className="logsignup">
                        <Link to={"/login"} className="lightBtn">
                            {" "}
                            Login{" "}
                        </Link>
                        <Link to={"/signup"} className="darkBtn">
                            {" "}
                            Signup{" "}
                        </Link>
                    </div>
                    <a href="#" className="landingpage-hm" onClick={toggleMenu}>
                        <i>
                            <FaBars size={30} color="#fff" />
                        </i>
                    </a>
                </div>
            </header>
            {isMenuOpen && <div className="overlay" onClick={toggleMenu}></div>}

            <div className={`hambergurmenu-cont ${isMenuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <a href="#land-seniors">Seniors</a>
                    </li>
                    <li>
                        <a href="#land-volunteer">Volunteers</a>
                    </li>
                    <li>
                        <a href="#land-events">Events</a>
                    </li>
                    <li>
                        <a href="#homeLink">Contact</a>
                    </li>
                    <Link to={"/signup"} className="darkBtn">
                            {" "}
                            Signup{" "}
                        </Link>
                </ul>
                <div className="logsignup">
                    <Link to={"/login"} className="lightBtn">
                        {" "}
                        Login{" "}
                    </Link>
                    <Link to={"/signup"} className="darkBtn">
                        {" "}
                        Signup{" "}
                    </Link>
                </div>
            </div>

      {/* <nav>
        <div className="signupHeader">
          <img src={IconLogo} alt="" />
          <div className="headerLinks">
            <li><a href="">Contact</a></li>
            <Link to="/signup"><button className="darkBtn">Sign Up</button></Link>
          </div>
        </div>
      </nav> */}


      <div className="main">
        <img className="signupImg" src={SignupImg} alt="" />
        <div className="signupForm">
          <h2>Login</h2>
          <label htmlFor="email">Email Address</label>
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
          <button className="darkBtn loginBtn" type="default" onClick={submit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

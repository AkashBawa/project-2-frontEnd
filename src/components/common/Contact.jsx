import React from 'react'
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconLogo from "./../../images/logo.png";
import Ahmed from "../../images/Profile-image/Untitled-4 2.png"
import teamImg from '../../images/Profile-image/20231028_160539 1.png'
import Akash from '../../images/Profile-image/akash.png'
import Alvin from '../../images/Profile-image/alvin.png'
import Beant from '../../images/Profile-image/beant.png'
import Farhang from '../../images/Profile-image/farhang.png'
import Jasmin from '../../images/Profile-image/jasmine.png'
import Jessica from '../../images/Profile-image/Jessica.png'
import Sarah from '../../images/Profile-image/sarah.png'
import Aman from '../../images/Profile-image/aman.png'

import { Alert, Select, Form, Input, DatePicker, TimePicker } from "antd";
import { Button } from "antd";

const Contact = () => {
    const { TextArea } = Input;
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (

        <div id='landingpage'>
            <header>
                <div className="container">
                    <a href="#" className="branding">
                        <img src={IconLogo} alt="Description of the image" />
                    </a>
                    <ul className="main-menu">
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
            <h1 className='contactTitle'>
                Contact Wisecare Team
            </h1>
            <div>
                <div className='team'>
                    <div className="teamMember">
                        <img src={Ahmed} alt="" />
                        <div className='memberDes'>
                            <h2>Ahmed Abdou</h2>
                            <p>Developer</p>
                            <p>linkedin.com/in/ahmed-abdou-mieaust-288a4863/</p>
                            {/* <p>Github</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Akash} alt="" />
                        <div className='memberDes'>
                            <h2>Akash</h2>
                            <p>Developer</p>
                            <p> linkedin.com/in/akash-bawa</p>
                            {/* <p>www.akashbawa.info</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Alvin} alt="" />
                        <div className='memberDes'>
                            <h2>Alvin Sierra</h2>
                            <p>Designer</p>
                            <p>linkedin.com/in/alvin-dave-sierra-3888b2211/</p>
                            {/* <p>Github</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Beant} alt="" />
                        <div className='memberDes'>
                            <h2>Beant Singh</h2>
                            <p>Designer</p>
                            <p>linkedin.com/in/beant-singh-a98439261/</p>
                            {/* <p>Github</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Farhang} alt="" />
                        <div className='memberDes'>
                            <h2>Farhang Eradi Alvandi</h2>
                            <p>Developer</p>
                            <p>linkedin.com/in/farhangalv</p>
                            {/* <p>github.com/farhangalvandi</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Jasmin} alt="" />
                        <div className='memberDes'>
                            <h2>Jasmine Pui Yuk Tse</h2>
                            <p>Designer</p>
                            <p>linkedin.com/in/jasmine-tse-590320287</p>
                            {/* <p>Github</p> */}
                        </div>
                    </div>
                    <div className="teamMember">
                        <img src={Jessica} alt="" />
                        <div className='memberDes'>
                            <h2>Jessica Ruiz</h2>
                            <p>Designer</p>
                            <p>linkedin.com/in/jessica-ruiz-b3110934</p>
                            {/* <p>behance.net/jessicaruiz24</p> */}
                        </div>
                    </div>
                    <div className='teamMember'>
                        <img src={Sarah} alt="" />
                        <div className='memberDes'>
                            <h2>Sarah Clavijo</h2>
                            <p>Designer</p>
                            <p>linkedin.com/in/sarah-clavijo-9882bb207/</p>
                            {/* <p>behance.net/sarahmclavijo1999</p> */}
                        </div>
                    </div>
                    <div className='teamMember'>
                        <img src={Aman} alt="" />
                        <div className='memberDes'>
                            <h2>Somchai Sik</h2>
                            <p>Developer</p>
                            <p>linkedin.com/in/somchai-sik-13aaa51b7</p>
                            {/* <p>github.com/aman7691ithub</p> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className='contactUs'>

                <img src={teamImg} alt="" />


                <Form
                    name="trigger"
                    style={{
                        maxWidth: 400
                    }}
                    layout="vertical"
                    autoComplete="off"
                >
                    <Form.Item label="Name">
                        <Input
                            placeholder="NAME"
                            name="name"

                        />
                    </Form.Item>
                    <Form.Item label="Age">
                        <Input
                            placeholder="Age"
                            name="age"

                        />
                    </Form.Item>
                    <Form.Item label="Contact Number">
                        <Input
                            placeholder="Contact Number"
                            name="contactNumber"

                        />
                    </Form.Item>



                    <Form.Item className="intesrestForm" label="Description">
                        <TextArea

                            rows={4}
                            placeholder="Interest"
                            name="interest"
                        // value={formData.interest}
                        // onChange={handleInputChange}
                        />
                    </Form.Item>

                    <Button className="darkBtn" type="primary" >
                        Submit
                    </Button>
                </Form>

            </div>
        </div>
    )
}

export default Contact
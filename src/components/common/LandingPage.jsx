import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconLogo from "./../../images/logo.png";
import Seniorslan1 from "./../../images/landingpage/group-seniors-park 1.png";
import Seniorslan2 from "./../../images/landingpage/group-seniors-park 2.png";
import Seniorslan3 from "./../../images/landingpage/group-seniors-park 3.png";
import Seniorslan4 from "./../../images/landingpage/group-seniors-park 4.png";
import Seniorslan5 from "./../../images/landingpage/group-seniors-park 5.png";
import iconElder from "./../../images/icon_profile_elderly.png";
import iconVolunteer from "./../../images/icon_volunteer.png";
import iconCommunity from "./../../images/icon_community.png";

const LandingPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div id="landingpage">
      <body>
        <header>
          <div className="container">
            <Link to={"/"}>
              {/* {" "} */}
              <img src={IconLogo} alt="Description of the image" />
              {/* {" "} */}
              {/* <a href="#" className="branding"> */}
              {/* </a> */}
            </Link>
            <ul className="main-menu">
              <li>
                <Link to={"/login"}>
                  {" "}
                  Seniors{" "}
                </Link>
              </li>
              <li>
                <Link to={"/login"}>
                  {" "}
                  Volunteers{" "}</Link>
              </li>
              <li>
                <Link to={"/login"}>{" "}
                  Events{" "}</Link>
              </li>
              <li>
                <Link to={"/contact"}>Contact</Link>
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
              <Link to={"/contact"}>Contact</Link>
            </li>
            <Link to={"/login"} className="darkBtn">
                            {" "}
                            Login{" "}
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
        <main>
          <section>
            <div className="containercont">
              <div className="sectioncont" id="land-seniors">
                <h1 className="lightH1">Seniors do you like some </h1>
                <h2 className="HeavyH2">extra help?</h2>
                <p>
                  Our Community of reliable Volunteers are committed  to provide help and support for our Seniors as a token of gratitude and caring for elders of the Community.
                </p>
                <div className="contbox">
                  <div className="contbox-left">
                    <i></i>
                  </div>
                  <div className="contbox-right">
                    <img src={iconElder} alt="Icon Elder" />
                    <div>
                      <h3>Senior and their relatives,</h3>
                      <p>
                        Look how we could help Seniors in some daily tasks <span>here.</span>
                      </p>
                    </div>
                  </div>
                  <div className="contbox-right">
                    <img src={iconVolunteer} alt="Icon Volunteer" />
                    <div>
                      <h3>Senior and their relatives,</h3>
                      <p>
                        Look how we could help Seniors in some daily tasks <span>here.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan1} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont">
              <div className="sectioncont">
                <div className="inlineLanding">
                  <img src={iconElder} alt="Icon Elder" />
                  <h2 className="HeavyH2">Seniors</h2>
                  <h1 className="LightH1">and their relatives</h1>
                </div>
                <p>
                  You or your family could request help for a task, and one of
                  the members of Volunteer team should contact you through
                  Wisecare and bring you all the support you need.
                </p>
                <p>If you need someone to accompany you to an appointment, or to walk with
                  you and your pet, to help you with the grocery bags or maybe
                  you need someone to read you a book or make you some company
                  and chat, Wisecare will help you to find that person.
                </p>
                <p> What is the process and how can you registered? Find it <span>here.</span>
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan2} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont" id="land-volunteer">
              <div className="sectioncont">
                <div className="inlineLanding">
                  <img src={iconVolunteer} alt="Icon Volunteer" />
                  <h2 className="HeavyH2">Volunteers</h2>
                </div>
                <p>
                  Joining Wisecare Volunteer team, you could help Seniors and
                  families in your neighborhood or in the Community near you.
                </p>
                <p>
                  Sometimes Seniors live alone and their families are too far
                  for helping in daily task. You can provide them some help and
                  time and make the real difference.
                </p>
                <p>
                  <span>Join the Volunteer team</span> and
                  could also participate at Volunteer Reward Program. See more
                  details <span>here.</span>
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan3} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont" id="land-rewards">
              <div className="sectioncont">
                <h2 className="HeavyH2">Volunteer Reward Program</h2>
                <div className="contbox">
                  <div className="contbox-left">
                    <i></i>
                  </div>
                  <div >
                    <h3>1. Earn points and redeem for badges.</h3>
                    <p>
                      On helping one senior you will earn points. Then redeem points for badges.</p>
                    <div id="space">
                      <p>50 points= Bronze badge</p>
                      <p>250 points= Silver badge</p>
                      <p>500 points= Gold badge</p>
                    </div>
                  </div>
                  <div >
                    <h3>2. Get your volunteer certificate.</h3>
                    <p>You can get a certificate for Volunteer service hours with minimum of 15 hours.</p>
                  </div>
                </div>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan4} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont" id="land-events">
              <div className="sectioncont">
                <div className="inlineLanding">
                  <img src={iconCommunity} alt="Icon Community" />
                  <h2 className="HeavyH2">Community Activities</h2>
                </div>
                <p>
                  We aim to be a friendly and Wise community where we can trust,
                  bring support and caring for each other. We invite the Senior
                  and Volunteers of Wisecare to join some fun, entertainment,
                  learning and well-being activities to be social, meet them and
                  be in contact with your neighbors and the community.
                  <p>
                    Check your invitations for events or meetings at your Wisecare board
                    and reserve your spot.
                  </p>
                  <p>
                    You also can suggest ideas for next events.
                  </p>
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan5} alt="Description of the image" />
              </div>
            </div>
            {/* <div id="homeLink">
              <Link to={"#landingpage"}>Home Page</Link>
            </div> */}
          </section>
        </main>
      </body>
    </div>
  );
};

export default LandingPage;

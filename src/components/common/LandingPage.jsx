import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import IconLogo from "./../../images/logo.png";
import Seniorslan1 from "./../../images/landingpage/group-seniors-park 1.png";
import Seniorslan2 from "./../../images/landingpage/group-seniors-park 2.png";
import Seniorslan3 from "./../../images/landingpage/group-seniors-park 3.png";
import Seniorslan4 from "./../../images/landingpage/group-seniors-park 4.png";
import Seniorslan5 from "./../../images/landingpage/group-seniors-park 5.png";

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
        </div>
        <main>
          <section>
            <div className="containercont">
              <div className="sectioncont">
                <h2>Hey Seniors! Do you need help?</h2>
                <p>
                  Our Community of reliable Volunteers is committed to providing
                  help and support for our Seniors as a token of gratitude and
                  caring for elders of the Community.
                </p>
                <div className="contbox">
                  <div className="contbox-left">
                    <i></i>
                  </div>
                  <div className="contbox-right">
                    <h3>Senior and their relatives,</h3>
                    <p>
                      Look how we could help Seniors in some daily tasks here.
                    </p>
                  </div>
                  <div className="contbox-right">
                    <h3>Senior and their relatives,</h3>
                    <p>
                      Look how we could help Seniors in some daily tasks here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan1} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont">
              <div className="sectioncont">
                <h2>Seniors and their relatives</h2>
                <p>
                  You or your family could request help for a task, and one of
                  the members of Volunteer team should contact you through
                  Wisecare and bring you all the support you need. If you need
                  someone to accompany you to an appointment, or to walk with
                  you and your pet, to help you with the grocery bags or maybe
                  you need someone to read you a book or make you some company
                  and chat, Wisecare will help you to find that person. What is
                  the process and how can you registered? Find it here
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan2} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont">
              <div className="sectioncont">
                <h2>Volunteers</h2>
                <p>
                  Joining Wisecare Volunteer team, you could help Seniors and
                  families in your neighborhood or in the Community near you.
                  Sometimes Seniors live alone and their families are too far
                  for helping in daily task. You can provide them some help and
                  time and make the real difference. Join the Volunteer team and
                  could also participate at Volunteer Reward Program. See more
                  details here.
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan3} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont">
              <div className="sectioncont">
                <h2>Volunteer Reward Program</h2>
                <div className="contbox">
                  <div className="contbox-left">
                    <i></i>
                  </div>
                  <div className="contbox-right">
                    <h3>Senior and their relatives,</h3>
                    <p>
                      Look how we could help Seniors in some daily tasks here.
                    </p>
                  </div>
                  <div className="contbox-right">
                    <h3>Senior and their relatives,</h3>
                    <p>
                      Look how we could help Seniors in some daily tasks here.
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan4} alt="Description of the image" />
              </div>
            </div>

            <div className="containercont">
              <div className="sectioncont">
                <h2>Community Activities</h2>
                <p>
                  We aim to be a friendly and Wise community where we can trust,
                  bring support and caring for each other. We invite the Senior
                  and Volunteers of Wisecare to join some fun, entertainment,
                  learning and well-being activities to be social, meet them and
                  be in contact with your neighbors and the community. Check
                  your invitations for events or meetings at your Wisecare board
                  and reserve your spot. You also can suggest ideas for next
                  events.
                </p>
              </div>

              <div className="sectionimg">
                <img src={Seniorslan5} alt="Description of the image" />
              </div>
            </div>
          </section>
        </main>
      </body>
    </div>
  );
};

export default LandingPage;

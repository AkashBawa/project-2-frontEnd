import UserOld from "./../../images/icon_profile_elderly_m.png";
import Eventsicon from "./../../images/icon_party_m.png";
import Logouticon from "./../../images/icon_logout_m.png";
import IconLogo from "./../../images/logo.png";

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const NewSideBar = () => {

    const [currentURL, setCurrentURL] = useState("");
    useEffect(() => {
        console.log(window.location.href);
        if (window.location.href.includes("elder")) {
            setCurrentURL("elder");
        } else {
            setCurrentURL("volunteer")
        }

    }, [])
    return (
        <div id="parentWrapper">

            <div id="newSideBar">
                <div className="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>

                    <ul className="menu__box">
                        <li className="logo">
                            <img src={IconLogo} alt="Wisecare logo" />
                        </li>
                        {
                            currentURL == "elder" ? <>
                                    <li>
                                        <Link className="menu__item" to="dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"event"}>  Events</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"logout"}> Logout</Link>
                                    </li>
                                </> : <>

                                    <li>
                                        <Link className="menu__item" to="dashboard">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"profile"}>  Profile</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"event"}> Events</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"rewards"}> Rewards</Link>
                                    </li>
                                    <li>
                                        <Link className="menu__item" to={"logout"}> Logout</Link>
                                    </li>

                                </>
                            
                        }

                    </ul>
                </div>
            </div>
            <div className="mainContent">
                <Outlet />
            </div>
        </div>

    )
}

export default NewSideBar

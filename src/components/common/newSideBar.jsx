import UserOld from "./../../images/Sen_icon.png";
import Eventsicon from "./../../images/icon_party.png";
import rewardsIcon from "./../../images/icon_rewards.png";
import Logouticon from "./../../images/icon_logout_m.png";
import IconLogo from "./../../images/logo.png";

// icon_fav_volunteers    

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
                                <li className="sideBarIcons">
                                    {/* <img src={UserOld} alt="Dashboard Icon" /> */}
                                    <img src={Eventsicon} alt="Dashboard Icon" />
                                    <Link className="menu__item" to="dashboard">Dashboard</Link>
                                </li>
                                <li className="sideBarIcons">
                                    <img src={Eventsicon} alt="Events Icon" />
                                    <Link className="menu__item" to={"event"}>  Events</Link>
                                </li>
                                <li className="sideBarIcons">
                                    <img src={Logouticon} alt="Logout icon" />
                                    <Link className="menu__item" to={"logout"}> Logout</Link>
                                </li>
                            </> : <>

                                <li className="sideBarIcons">
                                    <img src={Eventsicon} alt="Dashboard Icon" />
                                    <Link className="menu__item" to="dashboard">Dashboard</Link>
                                </li>
                                {/* <li className="sideBarIcons">
                                    <img src={IconLogo} alt="Wisecare logo" />
                                    <Link className="menu__item" to={"profile"}>  Profile</Link>
                                </li> */}
                                <li className="sideBarIcons">
                                    <img src={Eventsicon} alt="Events Icon" />
                                    <Link className="menu__item" to={"event"}> Events</Link>
                                </li>
                                <li className="sideBarIcons">
                                    <img src={rewardsIcon} alt="Rewards Icon" />
                                    <Link className="menu__item" to={"rewards"}> Rewards</Link>
                                </li>
                                <li className="sideBarIcons">
                                    <img src={Logouticon} alt="Logout icon" />
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

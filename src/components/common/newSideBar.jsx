import UserOld from "./../../images/Sen_icon.png";
import UserVolunteer from "./../../images/Vol_icon.png";
import Eventsicon from "./../../images/icon_party.png";
import rewardsIcon from "./../../images/icon_rewards.png";
import Logouticon from "./../../images/icon_logout_m.png";
import IconLogo from "./../../images/logo.png";
import LogouticonDark from "./../../images/icon_logout_m.png";
import EventsiconDark from "./../../images/icon_party_dark.png";
import UserOldDark from "./../../images/icon_profile_elderly_dark.png";
import UserVolunteerDark from "./../../images/icon_volunteer_dark.png";
import rewardsIconDark from "./../../images/icon_rewards_dark.png";



// icon_fav_volunteers    

import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const NewSideBar = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);

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
                            <Link className="amenu.item menu__item" to="dashboard"><img src={IconLogo} alt="Wisecare logo" /></Link>
                        </li>
                        {
                            currentURL == "elder" ? <>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)}>
                                    <img src={isHovered1 ? UserOldDark : UserOld} alt="Dashboard Icon" />
                                    <Link className="menu__item" to="dashboard">Dashboard</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}>
                                    <img src={isHovered2 ? EventsiconDark : Eventsicon} alt="Events Icon" />
                                    <Link className="menu__item" to={"event"}>  Events</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => setIsHovered3(false)}>
                                    <img src={isHovered3 ? Logouticon : Logouticon} alt="Logout icon" />
                                    <Link className="menu__item" to={"logout"}> Logout</Link>
                                </li>
                            </> : <>

                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)}>
                                    <img src={isHovered1 ? UserVolunteerDark : UserVolunteer} alt="Dashboard Icon" />
                                    <Link className="menu__item" to="dashboard">Dashboard</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}>
                                    <img src={isHovered2 ? EventsiconDark : Eventsicon} alt="Events Icon" />
                                    <Link className="menu__item" to={"event"}> Events</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered3(true)} onMouseLeave={() => setIsHovered3(false)}>
                                    <img src={isHovered3 ? rewardsIconDark : rewardsIcon} alt="Rewards Icon" />
                                    <Link className="menu__item" to={"rewards"}> Rewards</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered4(true)} onMouseLeave={() => setIsHovered4(false)}>
                                    <img src={isHovered4 ? UserVolunteerDark : UserVolunteer} alt="Logout icon" />
                                    <Link className="menu__item" to={"profile"}> Profile</Link>
                                </li>
                                <li className="sideBarIcons" onMouseEnter={() => setIsHovered5(true)} onMouseLeave={() => setIsHovered5(false)}>
                                    <img src={isHovered5 ? Logouticon : Logouticon} alt="Logout icon" />
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

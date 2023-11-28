import UserOld from "./../../images/icon_profile_elderly_m.png";
import Eventsicon from "./../../images/icon_party_m.png";
import Logouticon from "./../../images/icon_logout_m.png";

import { Link, Outlet } from "react-router-dom";

const NewSideBar = () => {
    return (
        <>
            <div id="newSideBar">
                <div className="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label className="menu__btn" htmlFor="menu__toggle">
                        <span></span>
                    </label>

                    <ul className="menu__box">
                        <li>
                            {/* <Link className="menu__item" to={"dashboard"}>   Dashboard </Link> */}
                            <Link className="menu__item" to="dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link className="menu__item" to={"event"}>  Events</Link>
                        </li>
                        <li>
                            <Link className="menu__item" to={"logout"}> Logout</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mainContent">
                <Outlet />
            </div>
        </>

    )
}

export default NewSideBar

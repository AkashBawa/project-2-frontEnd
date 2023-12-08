import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

// Import all components here
import LandingPage from "../components/common/LandingPage";
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Profiles from "../components/elderly/Profiles";

// elder components
import Dashboard from "../components/elderly/Dashboard";
import AddPost from "../components/elderly/addPost";
import Headers from "./../components/common/header";
import Posts from "../components/elderly/posts";
import Events from "../components/common/events/Events";

// volunteer components
import VolunteerDashBoard from "./../components/volunteer/dashboard";
import VOlunteerHeader from "./../components/volunteer/header";
import VolunteerProfile from "./../components/volunteer/Profile";
import VolunteerHistory from "./../components/volunteer/history/History";

import ReviewByElder from "../components/elderly/ReviewByElder";
import Rewards from "../components/volunteer/Rewards";
import NewSideBar from "../components/common/newSideBar";
import Contact from "../components/common/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/contact",
    element: <Contact />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  
  {
    path: "/elder",
    element: <NewSideBar/>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "posts",
        element: <Posts />
      },
      {
        path: "addPost",
        element: <AddPost />
      },
      {
        path: "reviewelder/:id",
        element: <ReviewByElder />
      },
      {
        path: "profile",
        element: <Profiles />
      },
      {
        path: "event",
        element: <Events />
      }
    ]
  },
  {
    path: "/volunteer",
    element: <NewSideBar/>,
    children: [
      {
        path: "dashboard",
        element: <VolunteerDashBoard />
      },
      {
        path: "profile",
        element: <VolunteerProfile />
      },
      {
        path: "history",
        element: <VolunteerHistory />
      },
      {
        path: "event",
        element: <Events />
      },
      {
        path: "rewards",
        element: <Rewards />
      }
    ]
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "*",
    element: <Navigate to={"/"} />
  }
]);

export default router;

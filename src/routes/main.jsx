import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
  } from "react-router-dom";

// Import all components here
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


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/elder",
      element: <Headers/>,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />
        },
        {
          path: "posts",
          element: <Posts/>
        },
        {
          path: "addPost",
          element: <AddPost/>
        },
        {
          path: "profile",
          element: <Profiles/>
        },
        {
          path: "event",
          element: <Events/>
        }
      ]
    },
    {
      path: "/volunteer",
      element: <VOlunteerHeader/>,
      children: [
        {
          path: "dashboard",
          element: <VolunteerDashBoard />
        },
        {
          path: "profile",
          element: <VolunteerProfile/>
        },
        {
          path: "history",
          element: <VolunteerHistory/>
        }
      ]
    },
    {
      path: "/",
      element: <Login/>
    },
    {
      path: "*",
      element: <Navigate to={"/"}/>
    }
  ]);

  export default router;
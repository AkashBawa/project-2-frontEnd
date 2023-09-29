import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

// Import all components here
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import Profiles from "../components/elderly/Profiles";

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
      path:"/elderProfile",
      element: <Profiles/>
    }

  ]);


  export default router;
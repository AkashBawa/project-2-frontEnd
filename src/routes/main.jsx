import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

// Import all components here
import Login from "../components/auth/login";
import Signup from "../components/auth/signup";

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/signup",
      element: <Signup/>
    }

  ]);


  export default router;
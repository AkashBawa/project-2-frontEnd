import "./App.scss";
import Loader from "./components/common/Loader";
import "./scss/main.scss"
import { RouterProvider } from "react-router-dom";
import routes from "./routes/main";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const loader = useSelector((state) => state.user.loader);
  
  return (
    <div className="App">

      {
        loader &&   <Loader/>
      }
     
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;

import './App.css';
import { RouterProvider } from "react-router-dom";
import routes from "./routes/main"
// import Profile from './src/components/elderly/Profile.jsx';


function App() {
  return (
    <div className="App">
        <RouterProvider router={routes} />
        
      <h1>Working</h1>
    </div>
  );
}

export default App;

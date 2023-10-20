import './App.scss';
import { RouterProvider } from "react-router-dom";
import routes from "./routes/main"
import Header from './components/common/header';

function App() {
  return (
    <div className="App">
        <RouterProvider router={routes} />
    </div>
  );
}

export default App;

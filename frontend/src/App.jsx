import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";




function App() {
  return <>

    <RouterProvider router={AppRouter()}/>
  
  </>;
}

export default App;

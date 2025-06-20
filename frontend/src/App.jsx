import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import LandingPage from "./pages/LandingPage";
import Signup from "./pages/Signup";

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage/>
  },
  {
    path : "/signup",
    element : <Signup/>
  }
])


function App() {
  return <>

    <RouterProvider router={appRouter}/>
  
  </>;
}

export default App;

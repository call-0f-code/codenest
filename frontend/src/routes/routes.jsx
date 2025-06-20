//import Pages here
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";

export const routes = [
    {
        path : '/',
        element : <LandingPage/>,
    },
    {
        path : '/signup',
        element : <Signup/>,
    
    }
];
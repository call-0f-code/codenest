//import Pages here
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";

export const routes = [
    {
        path : '/',
        element : <LandingPage/>,
    },
    {
        path : '/signup',
        element : <Signup/>,
    
    },{
        path : "*",
        element : <NotFound/>,
    }
];
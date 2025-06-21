//import Pages here
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Blogs from "../pages/Blogs";
import InterviewExp from "../pages/InterviewExp";
export const routes = [
    {
        path : '/',
        element : <LandingPage/>,
    },
    {
        path : '/signup',
        element : <Signup/>,
    
    },
    {
        path : '/blogs',
        element : <Blogs/>
    }
    ,
    {
        path : '/interviewExp',
        element : <InterviewExp/>
    },
    {
        path : "*",
        element : <NotFound/>,
    }
];
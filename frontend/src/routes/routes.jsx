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
        roles : ['user' , 'admin']
    },
    {
        path : '/signup',
        element : <Signup/>,
        roles : ['user' , 'admin']
    
    },
    {
        path : '/blogs',
        element : <Blogs/>,
        roles : ['user' , 'admin']
    
    }
    ,
    {
        path : '/interviewExp',
        element : <InterviewExp/>,
        roles : ['user' , 'admin']
    
    },
    {
        path : "*",
        element : <NotFound/>,
        roles : ['user' , 'admin']
    
    }
];
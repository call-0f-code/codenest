//import Pages here
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Blogs from "../pages/Blogs";
import InterviewExp from "../pages/InterviewExp";
import Unauthorized from "@/pages/Unauthorized";
export const routes = [
    {
        path : '/',
        element : <LandingPage/>,
        public : true
    },
    {
        path : '/signup',
        element : <Signup/>,
        public : true
    
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
    
    },
    {
        path : "/unauthorized",
        element : <Unauthorized/>,
        role : ["user" , "admin"]
    }
];
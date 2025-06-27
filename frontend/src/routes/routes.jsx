//import Pages here
import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Blogs from "../pages/Blogs";
import InterviewExp from "../pages/InterviewExp";
import Unauthorized from "@/pages/Unauthorized";
import CreateModule from "@/pages/CreateModule";
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
        roles : ['admin' , 'user']
    
    }
    ,
    {
        path : '/interviewExp',
        element : <InterviewExp/>,
        roles : ['user' , 'admin']
    
    },
    {
        path : '/createModule',
        element : <CreateModule/>,
        roles : ['admin']
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
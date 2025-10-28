import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import Blogs from "@/pages/Blogs";
import InterviewExp from "@/pages/InterviewExp";
import Unauthorized from "@/pages/Unauthorized";
import CreateModule from "@/pages/CreateModule";
import Dashboard from "@/pages/Dashboard";
import Module from "@/pages/Module"
import BlogSingle from "@/pages/BlogSingle";
import CreateBlog from "@/pages/CreateBlog";
import CreateInterviewExp from "@/pages/CreateInterviewExp";
import AuthPage from "../pages/Signup";
import DsaDashboard from "@/pages/DsaDashboard";
import ProfilePage from "@/pages/ProfilePage";
import InterviewExperiences from "@/pages/InterviewExp";
export const routes = [
  {
    path: "/",
    element: <LandingPage />,
    public: true,
  },
  {
    path: "/signup",
    element: <AuthPage />,
    public: true,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    public: true,
  },
  {
    path: "/profile",
    element:<ProfilePage/>,
    public:true,
  },
  {
    path : "/dashboard/blogs/:id",
    element : <BlogSingle/>,
    public: true,
  },
  {
    path : "/dsa",
    element : <DsaDashboard/>,
    public: true,
  },
  {
    path: "/interviews", 
    element: <InterviewExperiences/>,
    public: true,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    public: true,
    children: [
      {
        index: true,
        element: <Module/>,
        public: true,
      },
      {
        path: "blogs",
        element: <Blogs />,
        public: true,
      },
      {
        path: "interviewExp",
        element: <InterviewExp />,
        public: true,
      },
      {
        path: "createModule",
        element: <CreateModule />,
        public: true,
      },
      {
        path : "createBlog",
        element : <CreateBlog/>,
        public: true,
      },
      {
        path : "createInterviewExp",
        element : <CreateInterviewExp/>,
        public: true,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    public: true,
  },
];

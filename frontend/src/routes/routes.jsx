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
import Dashboardlayout from "@/components/Dashboard/Dashboardlayout";

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
    path: "/dashboard",
    element: <Dashboardlayout />,
    public: true,
    children: [
      {
        index: true,
        element: <ProfilePage/>,
        public: true,
      },
      {
        path: "blogs",
        element: <Blogs />,
        public: true,
      },
      {
        path: "dsa",
        element: <DsaDashboard />,
        public: true,
      },
      
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    public: true,
  },
];

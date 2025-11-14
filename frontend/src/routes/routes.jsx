import LandingPage from "../pages/LandingPage";
import NotFound from "../pages/NotFound";
import InterviewExp from "@/pages/InterviewExp";
import Unauthorized from "@/pages/Unauthorized";
import Dashboard from "@/pages/Dashboard";
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
        path: "interviewExp",
        element: <InterviewExp />,
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

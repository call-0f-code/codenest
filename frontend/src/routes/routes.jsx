import LandingPage from "../pages/LandingPage";
import Signup from "../pages/Signup";
import NotFound from "../pages/NotFound";
import Blogs from "@/pages/Blogs";
import InterviewExp from "@/pages/InterviewExp";
import Unauthorized from "@/pages/Unauthorized";
import CreateModule from "@/pages/CreateModule";
import Dashboard from "@/pages/Dashboard";
import Module from "@/pages/Module"
import BlogSingle from "@/pages/BlogSingle";
import SingleModule from "@/pages/SingleModule";

export const routes = [
  {
    path: "/",
    element: <LandingPage />,
    public: true,
  },
  {
    path: "/signup",
    element: <Signup />,
    public: true,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    roles: ["user", "admin"],
  },
  {
    path : "/dashboard/blogs/:id",
    element : <BlogSingle/>,
    roles : ["user" , 'admin']
  },
  {
    path : "/dashboard/modules/:id",
    element : <SingleModule/>,
    roles : ["user" , "admin"]
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    roles: ["user", "admin"],
    children: [
      {
        index: true,
        element: <Module/>,
        roles: ["user", "admin"],
      },
      {
        path: "blogs",
        element: <Blogs />,
        roles: ["user", "admin"],
      },
      {
        path: "interviewExp",
        element: <InterviewExp />,
        roles: ["user", "admin"],
      },
      {
        path: "createModule",
        element: <CreateModule />,
        roles: ["admin"],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    roles: ["user", "admin"],
  },
];

import { useState } from "react";
import { Outlet, useAsyncError } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Book, MessageSquare, LayoutDashboard, LogOut, Plus, Edit } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';

const Dashboard = () => {

  const navigate = useNavigate();
    console.log("Dashboard rendered");

  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  console.log(isAdmin);

  const baseMenuItems = [
    {
      title: "Modules",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: Book,
    },
    {
      title: "Interview Experience",
      url: "/dashboard/interviewExp",
      icon: MessageSquare,
    },
    {
      title: "Discussion Forum",
      url: "/dashboard/forum",
      icon: MessageSquare,
    },

    
  ];

  const adminMenuItems = [
    {
      title: "Create Module",
      url: "/dashboard/createModule",
      icon: Plus,
    },
    {
      title: "Create Blog",
      url: "/dashboard/createBlog",
      icon: Edit,
    },
    {
      title : "Create Interview Exp.",
      url : "/dashboard/createInterviewExp",
      icon : Edit,
    }
  ];

  const menuItems = isAdmin ? [...baseMenuItems, ...adminMenuItems] : baseMenuItems;

  const handleLogout = async() => {

    try{
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/logout`,
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials : true,
        }
      );
      if(res.data.success){
        toast.success(res.data.message);
        navigate('/');
        
      }
    }
    catch(err){
      toast.error(err.response.data.message);
    }
    // logout();
    
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-900">
        <Sidebar className="border-r border-gray-800">
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CN</span>
              </div>
              <span className="text-xl font-bold text-white">
                code<span className="text-purple-400">Nest</span>
              </span>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className="text-gray-300 hover:text-white hover:bg-gray-800"
                      >
                        <Link to={item.url}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <div className="bg-gray-900 border-b border-gray-800 p-4">
            <SidebarTrigger className="text-white" />
          </div>
          <div className="flex-1 bg-gray-900 text-white">
            <Outlet/>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
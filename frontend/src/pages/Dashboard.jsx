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
      const res = await axios.get("http://localhost:3000/api/v1/logout",
        {
          headers : {"Content-Type" : "application/json"},
          withCredentials : true,
        }
      );
      if(res.data.success){
        alert(res.data.message);
        navigate('/');
        
      }
    }
    catch(err){
      alert(err.response.data.message);
    }
    // logout();
    
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-950">
        <Sidebar className="border-r border-gray-700/50 bg-slate-800 shadow-xl">
          <SidebarHeader className="p-6 border-b border-slate-600/40 bg-slate-900/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">CN</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-100">
                  code<span className="text-purple-400">Nest</span>
                </span>
                <span className="text-xs text-slate-400">Development Hub</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={location.pathname === item.url}
                        className={`
                          relative overflow-hidden rounded-lg transition-all duration-200 ease-in-out
                          ${location.pathname === item.url 
                            ? 'bg-gradient-to-r from-purple-500/25 to-purple-600/25 text-white border border-purple-400/50 shadow-lg shadow-purple-500/20' 
                            : 'text-slate-300 hover:text-white hover:bg-slate-700/70 border border-transparent'
                          }
                          group px-4 py-3
                        `}
                      >
                        <Link to={item.url} className="flex items-center space-x-3 w-full">
                          <item.icon className={`w-5 h-5 transition-transform duration-200 ${location.pathname === item.url ? 'scale-110' : 'group-hover:scale-105'}`} />
                          <span className="font-medium">{item.title}</span>
                          {location.pathname === item.url && (
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent rounded-lg" />
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-slate-600/40 bg-slate-900/50">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-gray-300 hover:text-gray-100 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all duration-200 rounded-lg px-4 py-3 group"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3 group-hover:scale-105 transition-transform duration-200" />
              <span className="font-medium">Logout</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <div className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-700/50 p-4">
            <SidebarTrigger className="text-gray-300 hover:text-gray-100 hover:bg-gray-800/60 transition-all duration-200 rounded-lg p-2" />
          </div>
          <div className="flex-1 bg-gray-950 text-gray-100">
            <Outlet/>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
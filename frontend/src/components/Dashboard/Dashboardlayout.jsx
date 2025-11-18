
import { motion } from "framer-motion";
import { Users, FolderKanban, Code2, Trophy, Terminal } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboardlayout = () => {


  return (
    <div className="flex min-h-screen text-black bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="ml-64 flex-1 relative min-h-screen overflow-hidden   space-y-6">
          <Outlet />
      </div>
    </div>
  );
};

export default Dashboardlayout;

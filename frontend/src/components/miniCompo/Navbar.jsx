import { Code2, Moon, Sun } from "lucide-react";
import { Link, Links, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token') || null;

  return (
    <nav className="border-b-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810]">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link to={'/'} className="flex items-center gap-3">
          <div className="bg-[#C1502E] p-2 border-4 border-black dark:border-[#F5E6D3] rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]">
            <Code2 className="h-8 w-8 text-[#F5E6D3]" />
          </div>
          <h1 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] tracking-tight">
            CALL OF CODE
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to={'/dsa'} className="px-6 py-2 font-bold text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-transform">
            DSA
          </Link>
          <Link to={'/interviewExp'} className="px-6 py-2 font-bold text-[#2C1810] dark:text-[#F5E6D3] hover:translate-x-1 hover:translate-y-1 transition-transform">
            Blogs
          </Link>

          
        </div>
      </div>
    </nav>
  );
}

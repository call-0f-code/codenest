import { Code2, LogOut, Sun, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || null;

  return (
    <nav className="border-b-4 border-black dark:border-[#F5E6D3] bg-[#F5E6D3] dark:bg-[#2C1810]">
      <div className="max-w-[90rem] mx-auto px-6 py-6 flex items-center justify-between">
        <Link to={"/"} className="flex items-center gap-3">
          <div className="bg-[#C1502E] p-2 border-4 border-black dark:border-[#F5E6D3] rotate-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)]">
            <Code2 className="h-8 w-8 text-[#F5E6D3]" />
          </div>
          <h1 className="text-3xl font-black text-[#2C1810] dark:text-[#F5E6D3] tracking-tight">
            CALL OF CODE
          </h1>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to={"/dsa"}
            className="px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"
          >
            DSA
          </Link>
          <Link
            to={"/interviewExp"}
            className="px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"          >
            Blogs
          </Link>

          <div>
             {token ? (
            <div className="flex gap-16 justify-end">
              <button
                onClick={() => navigate("/profile")}
                className="px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"                >
                <User />
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("token"), navigate("/home");
                }}
                className="px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"              >
                <LogOut/>
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-2 font-black border-4 border-black dark:border-[#F5E6D3] bg-[#C1502E] text-[#F5E6D3] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,230,211,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(245,230,211,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[1px_1px_0px_0px_rgba(245,230,211,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all duration-150"              >
                JOIN NOW
              </button>
            </>
          )}
          </div>
        </div>
      </div>
    </nav>
  );
}

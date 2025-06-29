import Logo from "../assets/sliit360.svg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/api/authContext";
import MenuIco from "@/assets/menu.png";
import { useState } from "react";
import LogoutIco from "@/assets/logout.png";
import LogoutMDIco from "@/assets/logout_md.png";
import { focus } from "@/assets";

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const sideNavigation = [
    { key: "dashboard", label: "Dashboard", path: "/dashboard" },
    { key: "timetables", label: "Timetables", path: "/dashboard/timetables" },
    // { key: "notices", label: "Notices", path: "/dashboard/notices" },
    { key: "users", label: "Users", path: "/dashboard/users" },
    // { key: "profile", label: "Profile", path: "/dashboard/profile" },
    { key: "home", label: "Home", path: "/" },
  ];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 grid grid-cols-12 gap-4 overflow-hidden p-4">
        {/* Sidebar */}
        <div className="col-span-12 bg-gray-100/80 backdrop-blur-lg border rounded-lg flex flex-col p-4 lg:col-span-2">
          <div className="flex justify-between items-center">
            <img
              src={MenuIco}
              alt="menu"
              className="w-8 z-10 h-8 cursor-pointer lg:hidden"
              onClick={handleClick}
            />
            <Link to="/">
              <img
                className="h-8 object-contain shadow-lg md:h-10 hover:scale-105 transition-all duration-200"
                src={focus}
                alt="logo"
              />
            </Link>
          </div>
          <div
            className={`${
              isMenuOpen == false ? "hidden" : "block"
            } transition-all duration-500 xl:justify-between h-full xl:flex xl:flex-col`}
          >
            {/* Navigation Links */}
            <div className="mt-8 space-y-2">
              {sideNavigation
                .filter((item) => item.key !== "users" || user.role === "admin")
                .map((item) => (
                  <Link
                    onClick={handleClick}
                    key={item.key}
                    to={item.path}
                    className={`group flex items-center border border-[#0455bf]/10 p-3 cursor-pointer rounded-lg transition duration-200 ${
                      location.pathname === item.path
                        ? "bg-gray-200 font-medium"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
            </div>
            {/* Logout Button */}
            <div>
              {user && (
                <div className="w-full items-end justify-end md:justify-start flex">
                  <button
                    onClick={logout}
                    className="py-3 hidden items-center justify-between px-6 border border-[#0455bf]/10 xl:flex cursor-pointer hover:bg-gray-200 transition duration-200 rounded-lg w-full text-left"
                  >
                    Logout
                    <img src={LogoutMDIco} className="w-8 h-8" />
                  </button>
                  <img src={LogoutMDIco} className="xl:hidden w-8 h-8 mt-4" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-4 xl:mt-0 col-span-12 p-4 rounded-xl bg-gray-100/80 border backdrop-blur-lg max-h-full overflow-auto lg:col-span-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

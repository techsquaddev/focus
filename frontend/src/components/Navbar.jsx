import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/sliit360.svg";
import { Wrapper } from ".";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useAuth } from "@/api/authContext";
import { focus } from "@/assets";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <Wrapper>
      <nav className="my-5">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              className="h-8 object-contain shadow-lg md:h-10 hover:scale-105 transition-all duration-200"
              src={focus}
              alt="logo"
            />
          </Link>

          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-text bg-white border border-border p-2 rounded-lg shadow-lg hover:bg-soft-gray transition-colors duration-300">
                  <MenuIcon />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1">
                <DropdownMenuGroup>
                  <Link to="/">
                    <DropdownMenuItem className="text-text mb-0.5 text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>Home</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/about">
                    <DropdownMenuItem className="text-text mb-0.5 text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>About</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/contact">
                    <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>Contact</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/projects">
                    <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                      <span>Projects🔥</span>
                    </DropdownMenuItem>
                  </Link>
                  {user ? (
                    <>
                      <Link to="/dashboard">
                        <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                          <span>Dashboard</span>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                        <button onClick={logout}>Logout</button>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                          <span>Login</span>
                        </DropdownMenuItem>
                      </Link>
                      <Link to="/register">
                        <DropdownMenuItem className="text-text text-sm md:text-base font-semibold p-1 px-2 py-1.5 outline-none transition-colors rounded-sm select-none cursor-pointer hover:bg-soft-gray hover:text-text">
                          <span>Register</span>
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;

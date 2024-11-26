import axios from "axios";
import { Button } from "./button";
import { backendURL } from "@/config";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png";

export const Navbar = () => {
  const username = localStorage.getItem("username");

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendURL}/api/v1/auth/logout`);
      if (response.data.message === "Logout successful") {
        localStorage.removeItem("username");
        window.location.href = "/";
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error occurred", error);
    }
  };

  return (
    <div className="flex justify-between w-screen p-5 bg-black">
      {/* Left Section: Logo and Navigation Links */}
      <div className="flex items-center gap-5 mt-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <div className="text-white">
          <a href="/home">Home</a>
        </div>
        {username && (
          <>
            <div className="text-white">
              <a href="/create">Add an Employee</a>
            </div>
            <div className="text-white">
              <a href="/employeelist">Employee List</a>
            </div>
          </>
        )}
      </div>

      {/* Right Section: Username or Sign In/Logout Button */}
      <div className="flex items-center gap-5">
        {username ? (
          <>
            <div className="mt-2 text-white">{username}</div>
            <Button
              onClick={handleLogout}
              className="text-black bg-white hover:border hover:border-white hover:text-white"
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            onClick={() => (window.location.href = "/")}
            className="text-black bg-white hover:border hover:border-white hover:text-white"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

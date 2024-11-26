import { useState } from "react";
import axios from "axios";
import { Button } from "./button";
import { backendURL } from "@/config";
import { toast } from "react-hot-toast";
import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  UserPlus, 
  List, 
  LogOut 
} from "lucide-react";

export const Navbar = () => {
  const username = localStorage.getItem("username");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      toast.error("Logout failed. Please try again.");
    }
  };

  const NavLinks = () => (
    <>
      <motion.a 
        href="/home" 
        className="flex items-center gap-2 text-white transition-colors hover:text-gray-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Home size={20} />
        <span>Home</span>
      </motion.a>
      {username && (
        <>
          <motion.a 
            href="/create" 
            className="flex items-center gap-2 text-white transition-colors hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus size={20} />
            <span>Add Employee</span>
          </motion.a>
          <motion.a 
            href="/employeelist" 
            className="flex items-center gap-2 text-white transition-colors hover:text-gray-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <List size={20} />
            <span>Employee List</span>
          </motion.a>
        </>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-black shadow-lg">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-10 h-10 rounded-full" 
            />
            {username && (
              <div className="text-sm text-white md:hidden">
                Welcome, {username}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="items-center hidden gap-6 md:flex">
          <NavLinks />
        </div>

        {/* User Actions */}
        <div className="items-center hidden gap-4 md:flex">
          {username ? (
            <>
              <div className="text-sm text-white">Welcome, {username}</div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-black bg-white hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => (window.location.href = "/")}
                className="text-black bg-white hover:bg-gray-100"
              >
                Sign In
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-90 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <NavLinks />
              {username ? (
                <Button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-black bg-white hover:bg-gray-100"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              ) : (
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="text-black bg-white hover:bg-gray-100"
                >
                  Sign In
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};
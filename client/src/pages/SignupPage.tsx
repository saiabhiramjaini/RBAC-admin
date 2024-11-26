import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "@/config";
import { Login } from "@abhiram2k03/rbac-common";
import { toast } from "react-hot-toast";
import Lottie from 'lottie-react';
import signupAnimation from '@/assets/signup-animation.json'; 
import { motion } from 'framer-motion';

export const SignupPage = () => {
  const [signupData, setSignupData] = useState<Login>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(`${backendURL}/api/v1/auth`, signupData);
      if (response.data.message === "User created") {
        const username = response.data.user.username;
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response.data.message === "Validation failed") {
        toast.error(error.response.data.errors[0].message);
      } else {
        toast.error(error.response.data.message);
      }
      console.error("Error occurred", error);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex items-center justify-center flex-1 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="flex w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-2xl"
        >
          {/* Animation Section */}
          <div className="items-center justify-center hidden w-1/2 p-8 md:flex">
            <Lottie
              animationData={signupAnimation}
              loop={true}
              className="w-full h-full max-h-96"
            />
          </div>

          {/* Signup Form Section */}
          <div className="w-full p-8 md:w-1/2">
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 text-3xl font-bold text-center text-gray-800"
            >
              Create Account
            </motion.h2>

            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  value={signupData.username}
                  onChange={handleChange}
                  placeholder="Choose a unique username"
                  className="mt-1"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  value={signupData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="mt-1"
                  required
                />
              </motion.div>

              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-red-500"
                >
                  {errorMessage}
                </motion.p>
              )}

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-between"
              >
                <p className="w-full text-xs text-right cursor-pointer hover:underline">
                  <a href="/">Already have an account? Login</a>
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  className="w-full mt-4 hover:bg-white hover:border hover:border-black hover:text-black" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Signup"}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendURL } from "@/config";
import { Login } from "@abhiram2k03/rbac-common";
import { toast } from "react-hot-toast";
import { Navbar } from "@/components/ui/Navbar";

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
      const response = await axios.post(`${backendURL}/api/v1/auth`,signupData);
      if (response.data.message === "User created") {
        const username = response.data.user.username;
        localStorage.setItem("username", username);
        navigate("/home");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    }  catch (error: any) {
      if(error.response.data.message === "Validation failed"){
        toast.error(error.response.data.errors[0].message);
      }
      else{
        toast.error(error.response.data.message);
      }
      console.error("Error occured", error);
      setErrorMessage("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center">Signup</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                value={signupData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={signupData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            <div className="flex items-center justify-end">
              <p className="text-sm cursor-pointer hover:underline">
              <a href="/">Already have an account? Login</a>
              </p>
            </div>
            <Button className="w-full mt-4" type="submit" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

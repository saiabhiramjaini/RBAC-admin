import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { HomePage } from "./pages/HomePage";
import { CreateEmployeePage } from "./pages/CreateEmployeePage";
import { EmployeeListPage } from "./pages/EmployeeListPage";
import { UpdateEmployeePage } from "./pages/UpdateEmployeePage";

import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/ui/Navbar";

export default function App() {
  const isLoggedIn = localStorage.getItem("username") !== null;

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />
            }
          />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/create" element={<CreateEmployeePage />} />
          <Route path="/employeelist" element={<EmployeeListPage />} />
          <Route path="/update/:id" element={<UpdateEmployeePage />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

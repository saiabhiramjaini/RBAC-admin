import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { backendURL } from "@/config";
import { employeeSchema } from "@abhiram2k03/rbac-common";
import { toast } from "react-hot-toast";

export const UpdateEmployeePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "",
    permissions: [] as string[],
    status: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/employee/${id}`);
        setEmployeeData(response.data);
        setImagePreview(response.data.image);
      } catch (error) {
        console.error("Error fetching employee:", error);
        toast.error("Failed to fetch employee data");
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (permission: string, checked: boolean) => {
    setEmployeeData((prevData) => ({
      ...prevData,
      permissions: checked
        ? [...prevData.permissions, permission]
        : prevData.permissions.filter((perm) => perm !== permission),
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEmployeeData({
        ...employeeData,
        image: e.target.files[0],
      });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("cloud_name", cloudinaryCloudName);

    const response = await axios.post(cloudinaryURL, formData, {
      withCredentials: false,
    });
    return response.data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      let dataToSend = { ...employeeData };

      if (employeeData.image instanceof File) {
        const imageUrl = await uploadImage(employeeData.image);
        dataToSend.image = imageUrl;
      }

      const validationResult = employeeSchema.safeParse(dataToSend);
      if (!validationResult.success) {
        console.error("Validation Error: ", validationResult.error);
        toast.error(validationResult.error.errors[0].message);
        setErrorMessage("Employee update failed. Please try again.");
        return;
      }

      const response = await axios.put(
        `${backendURL}/api/v1/employee/${id}`,
        dataToSend
      );
      if (response.status === 200) {
        toast.success("Employee updated successfully");
        navigate("/employeelist"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        localStorage.removeItem("username");
        toast.error("Session expired. Please login again.");
        navigate("/");
      } else {
        toast.error(error.response?.data?.message || "An error occurred");
        console.error("Error occurred", error);
        setErrorMessage("Updating employee failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center flex-1 p-4"
      >
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Edit Employee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={employeeData.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="mt-1"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="mt-1"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="mobile">Mobile No</Label>
                  <Input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={employeeData.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile No"
                    className="mt-1"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label>Gender</Label>
                  <RadioGroup
                    value={employeeData.gender}
                    onValueChange={(value) =>
                      setEmployeeData({ ...employeeData, gender: value })
                    }
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="M" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="F" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    value={employeeData.status}
                    onValueChange={(value) =>
                      setEmployeeData({ ...employeeData, status: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label>Permissions</Label>
                  <div className="flex flex-col space-y-2">
                    {["read", "write", "delete"].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.toLowerCase()}
                          checked={employeeData.permissions.includes(permission)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(permission, checked as boolean)
                          }
                        />
                        <Label htmlFor={permission.toLowerCase()}>
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <Label htmlFor="imgUpload">Image Upload</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      id="imgUpload"
                      onChange={handleImageChange}
                      className="flex-1"
                      accept=".jpg,.png"
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="object-cover w-16 h-16 rounded"
                      />
                    )}
                  </div>
                </motion.div>

                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Updating..." : "Update Employee"}
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};


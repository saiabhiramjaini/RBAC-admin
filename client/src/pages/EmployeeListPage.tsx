import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { backendURL } from "@/config";
import { Employee } from "@abhiram2k03/rbac-common";
import { Search, UserPlus, Edit2, Trash2, UserIcon as Male, UserIcon as Female, Check, X } from 'lucide-react';

export const EmployeeListPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendURL}/api/v1/employee`, {withCredentials: true});
        setEmployees(response.data);
      } catch (error: any) {
        if(error.response?.status === 401) {
          localStorage.removeItem("username");
          toast.error("Session expired. Please login again.");
          navigate("/");
        } else {
          console.error("Error fetching employees:", error);
          setErrorMessage("Failed to load employee data.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${backendURL}/api/v1/employee/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      toast.success("Employee deleted successfully");
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Failed to delete employee.");
    }
  };

  const filteredEmployees = employees.filter((employee) => {
    return Object.values(employee).some((value) => 
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const MotionCard = motion(Card);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container p-6 mx-auto">
        <MotionCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden"
        >
          <CardHeader className="bg-white border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Employee List</CardTitle>
              <Button onClick={() => navigate("/create")} className="bg-green-500 hover:bg-green-600">
                <UserPlus className="w-4 h-4 mr-2" />
                Create Employee
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                Total Employees: <span className="font-semibold text-gray-700">{filteredEmployees.length}</span>
              </div>
              <div className="relative">
                <Search className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <Input
                  className="w-64 pl-10"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {errorMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 mb-4 text-red-700 bg-red-100 rounded"
              >
                {errorMessage}
              </motion.div>
            )}

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell colSpan={6}>
                          <Skeleton className="w-full h-12" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee._id} className="hover:bg-gray-50">
                        <TableCell className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={employee.image} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-gray-500">{employee._id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{employee.email}</div>
                          <div className="text-sm text-gray-500">{employee.mobile}</div>
                        </TableCell>
                        <TableCell>
                          {employee.gender === 'M' ? (
                            <Male className="text-blue-500" />
                          ) : (
                            <Female className="text-pink-500" />
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                            {employee.status === 'Active' ? <Check className="w-3 h-3 mr-1" /> : <X className="w-3 h-3 mr-1" />}
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {employee.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/update/${employee._id}`)}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(employee._id!)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </MotionCard>
      </div>
    </div>
  );
};

export default EmployeeListPage;


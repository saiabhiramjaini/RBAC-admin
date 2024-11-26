"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployee = exports.getEmployees = exports.createEmployee = void 0;
const zod_1 = __importDefault(require("zod"));
const employeeModel_1 = __importDefault(require("../models/employeeModel"));
const rbac_common_1 = require("@abhiram2k03/rbac-common");
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeData = rbac_common_1.employeeSchema.parse(req.body);
        const existingEmployee = yield employeeModel_1.default.findOne({ email: employeeData.email });
        if (existingEmployee) {
            return res.status(400).json({ message: "Employee already exists." });
        }
        const newEmployee = yield employeeModel_1.default.create(employeeData);
        return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map(error => ({
                    field: error.path[0],
                    message: error.message
                }))
            });
        }
        console.error("Error creating employee:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.createEmployee = createEmployee;
const getEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employeeModel_1.default.find();
        return res.status(200).json(employees);
    }
    catch (err) {
        console.error("Error retrieving employees:", err);
        return res.status(500).json({ message: "Internal server error", cookie: req.cookies });
    }
});
exports.getEmployees = getEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield employeeModel_1.default.findById({ _id: id });
        return res.status(200).json(employee);
    }
    catch (err) {
        console.error("Error retrieving employees:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getEmployee = getEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employeeData = rbac_common_1.employeeSchema.parse(req.body);
        const updatedEmployee = yield employeeModel_1.default.findByIdAndUpdate(id, employeeData, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map(error => ({
                    field: error.path[0],
                    message: error.message
                }))
            });
        }
        console.error("Error updating employee:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedEmployee = yield employeeModel_1.default.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteEmployee = deleteEmployee;

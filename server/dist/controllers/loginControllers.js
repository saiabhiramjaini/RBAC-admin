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
exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const zod_1 = __importDefault(require("zod"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginModel_1 = __importDefault(require("../models/loginModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rbac_common_1 = require("@abhiram2k03/rbac-common");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = rbac_common_1.loginSchema.parse(req.body);
        const existingUser = yield loginModel_1.default.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists. Please login." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield loginModel_1.default.create({
            username,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: newUser._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res.status(201).json({ message: "User created", user: newUser });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message,
                })),
            });
        }
        console.error("Error creating user:", err);
        return res
            .status(500)
            .json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = rbac_common_1.loginSchema.parse(req.body);
        const existingUser = yield loginModel_1.default.findOne({ username });
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "User doesn't exists. Please Signup." });
        }
        const comparePassword = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });
        return res
            .status(200)
            .json({ message: "Login successful", user: existingUser });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message,
                })),
            });
        }
        console.error("Error creating user:", err);
        return res
            .status(500)
            .json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "Logout successful" });
    }
    catch (err) {
        console.error("Error logging out user:", err);
        return res
            .status(500)
            .json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.logoutUser = logoutUser;

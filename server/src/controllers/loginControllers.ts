import { Request, Response } from "express";
import z from "zod";
import bcrypt from "bcryptjs";
import LoginModel from "../models/loginModel";
import jwt from "jsonwebtoken";
import { loginSchema } from "@abhiram2k03/rbac-common";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const existingUser = await LoginModel.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await LoginModel.create({
      username,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!);
    res.cookie("token", token, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    if (err instanceof z.ZodError) {
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
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const existingUser = await LoginModel.findOne({ username });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "User doesn't exists. Please Signup." });
    }

    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET!);
    res.cookie("token", token, { 
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    return res
      .status(200)
      .json({ message: "Login successful", user: existingUser });
  } catch (err) {
    if (err instanceof z.ZodError) {
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
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error logging out user:", err);
    return res
      .status(500)
      .json({
        message: "An unexpected error occurred. Please try again later.",
      });
  }
};

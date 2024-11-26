import {z} from 'zod';

export const loginSchema = z.object({
    username: z.string().min(1, { message: "Username should be non-empty" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  });

export const employeeSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(1, {message:"Name is required"}),
    email: z.string().email({message: "Invalid email address"}),
    mobile: z.string().min(10, {message: "Mobile number should contain 10 digits"}),
    gender: z.enum(["M", "F"], {message:"Invalid gender"}),
    permissions: z.array(z.enum(["read", "write", "delete"]), { message: "Invalid permission" }),
    status: z.enum(["Active", "Inactive"], {message: "Invalid status"}),
    image: z.string({message: "Upload Image"}).url({ message: "Invalid image URL" })
});

export type Login = z.infer<typeof loginSchema>;
export type Employee = z.infer<typeof employeeSchema>;


export enum genderEnum {
    "M",
    "F"
}

export enum statusEnum {
    "Active",
    "Inactive"
}

export enum permissionEnum {
    "read",
    "write",
    "delete"
}
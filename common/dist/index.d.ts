import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export declare const employeeSchema: z.ZodObject<{
    _id: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    email: z.ZodString;
    mobile: z.ZodString;
    gender: z.ZodEnum<["M", "F"]>;
    permissions: z.ZodArray<z.ZodEnum<["read", "write", "delete"]>, "many">;
    status: z.ZodEnum<["Active", "Inactive"]>;
    image: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "Active" | "Inactive";
    name: string;
    email: string;
    mobile: string;
    gender: "M" | "F";
    permissions: ("read" | "write" | "delete")[];
    image: string;
    _id?: string | undefined;
}, {
    status: "Active" | "Inactive";
    name: string;
    email: string;
    mobile: string;
    gender: "M" | "F";
    permissions: ("read" | "write" | "delete")[];
    image: string;
    _id?: string | undefined;
}>;
export type Login = z.infer<typeof loginSchema>;
export type Employee = z.infer<typeof employeeSchema>;
export declare enum genderEnum {
    "M" = 0,
    "F" = 1
}
export declare enum statusEnum {
    "Active" = 0,
    "Inactive" = 1
}
export declare enum permissionEnum {
    "read" = 0,
    "write" = 1,
    "delete" = 2
}

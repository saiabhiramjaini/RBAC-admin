"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionEnum = exports.statusEnum = exports.genderEnum = exports.employeeSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username should be non-empty" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});
exports.employeeSchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    mobile: zod_1.z.string().min(10, { message: "Mobile number should contain 10 digits" }),
    gender: zod_1.z.enum(["M", "F"], { message: "Invalid gender" }),
    permissions: zod_1.z.array(zod_1.z.enum(["read", "write", "delete"]), { message: "Invalid permission" }),
    status: zod_1.z.enum(["Active", "Inactive"], { message: "Invalid status" }),
    image: zod_1.z.string({ message: "Upload Image" }).url({ message: "Invalid image URL" })
});
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["M"] = 0] = "M";
    genderEnum[genderEnum["F"] = 1] = "F";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
var statusEnum;
(function (statusEnum) {
    statusEnum[statusEnum["Active"] = 0] = "Active";
    statusEnum[statusEnum["Inactive"] = 1] = "Inactive";
})(statusEnum || (exports.statusEnum = statusEnum = {}));
var permissionEnum;
(function (permissionEnum) {
    permissionEnum[permissionEnum["read"] = 0] = "read";
    permissionEnum[permissionEnum["write"] = 1] = "write";
    permissionEnum[permissionEnum["delete"] = 2] = "delete";
})(permissionEnum || (exports.permissionEnum = permissionEnum = {}));

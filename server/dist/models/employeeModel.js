"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rbac_common_1 = require("@abhiram2k03/rbac-common");
const EmployeeSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: rbac_common_1.genderEnum
    },
    permissions: {
        type: [String],
        required: true,
        enum: rbac_common_1.permissionEnum
    },
    status: {
        type: String,
        required: true,
        enum: rbac_common_1.statusEnum
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const Employee = mongoose_1.default.model('Employee', EmployeeSchema);
exports.default = Employee;

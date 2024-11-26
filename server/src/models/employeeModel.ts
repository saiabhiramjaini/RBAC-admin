import mongoose from 'mongoose';
import { genderEnum, permissionEnum, statusEnum  } from '@abhiram2k03/rbac-common';

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true,
        enum: genderEnum
    },
    permissions:{
        type: [String],
        required: true,
        enum: permissionEnum
    },
    status:{
        type: String,
        required: true,
        enum: statusEnum
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;
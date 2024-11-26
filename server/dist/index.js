"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connect_1 = __importDefault(require("./db/connect"));
const loginRoutes_1 = __importDefault(require("./routes/loginRoutes"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173',
        "https://deals-dray-wine.vercel.app",
        "https://dealsdray.abhiramverse.tech"],
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/auth', loginRoutes_1.default);
app.use('/api/v1/employee', employeeRoutes_1.default);
(0, connect_1.default)();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

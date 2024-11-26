import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './db/connect';
import loginRouter from './routes/loginRoutes';
import employeeRouter from './routes/employeeRoutes';
require('dotenv').config();

const app= express();

app.use(cors({
  origin: ['http://localhost:5173', 
    "https://deals-dray-wine.vercel.app",
    "https://dealsdray.abhiramverse.tech"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', loginRouter);
app.use('/api/v1/employee', employeeRouter);

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import LoginModel from '../models/loginModel';
import { AuthenticatedRequest } from '../utils/types';

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const user = await LoginModel.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

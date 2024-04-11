// import jwt, { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import User from "../../src/model/user.model";
import { Request, Response, NextFunction } from 'express';



declare namespace Express {
    export interface Request {
        user: any;
    }
    export interface Response {
        user: any;
    }
  }

// ADMIN VERIFY TOKEN
export const adminVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers['authorization'];
        if (authorization === undefined) {
            return res.json({ message: `Invalid Authorization ${console.error()}`});
        }
        const  token = authorization.split(" ")[1];
        // if (token === undefined) 
        if (!token)
        {
            return res.status(401).json({ message: `Unauthorized ${console.error()}`});
        } else {
            // let payLoad  = jwt.verify(token, 'Admin');
            const payLoad: any = jwt.verify(token, 'Admin');
            // console.log(payLoad.adminId);

            const adminId = payLoad.adminId;
            const admin = await User.findById(adminId);
            // console.log(admin);
            if (admin) {
                req.admin = admin;
                next();
            } else {
                return res.status(401).json({ message: `Invalid Admin (token) ${console.error()}`});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From Admin Token`});
    }
}
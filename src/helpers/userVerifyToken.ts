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

// USER VERIFY TOKEN
export const userVerifyToken = async (req: Request, res: Response, next: NextFunction) => {
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
            // let payLoad  = jwt.verify(token, 'User');
            const payLoad: any = jwt.verify(token, 'User');
            // console.log(payLoad.userId);

            const userId = payLoad.userId;
            const user = await User.findById(userId);
            // console.log(user);
            if (user) {
                req.user = user;
                next();
            } else {
                return res.status(401).json({ message: `Invalid User (token) ${console.error()}`});
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ message: `Internal Server Error From User Token`});
    }
}
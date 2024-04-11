import UserServices from "../../services/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userService = new UserServices();

declare global{
    namespace Express {
        interface Request {
            user?: object;
        }
    }
}

// REGISTER USER
export const registerUser = async(req: Request,res: Response) => {
    try {
        let user : object | null = await userService.getUser({ email: req.body.email });
        // console.log(user);
        if(user){
            return res.status(400).json({ message: `User is Already Registerd...`});
        }
        let hashPassword : string = await bcrypt.hash(req.body.password, 10);
        // console.log(hashPassword);
        user = await userService.addNewUser({
            ...req.body,
            password: hashPassword,
        });
        res.status(201).json({admin: user, message: `New User Is Added SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    } 
};

// LOGIN USER
export const loginUser = async(req: Request,res: Response) => {
    try {
        let user = await userService.getUser({email: req.body.email, isDelete: false});
        // console.log(user);
        if (!user) {
            return res.status(404).json({message:`Email Not Found....`});
        }
        let checkPassword = await bcrypt.compare(req.body.password, user.password);
        if (!checkPassword) {
            return res.status(401).json({message: `Password is Not Match...`});
        }
        let token : string = jwt.sign({ userId: user._id}, 'User');
        // console.log(token);
        res.status(200).json({ token, message: `User Login SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// GET ALL USER
export const getAllUser = async(req: Request,res: Response) => {
    try {
        let user = await userService.getAllUser({isDelete: false , isAdmin:false});
        // console.log(user);
        if(!user){
            return res.status(404).json({ message: `User Data Not Found...!`});
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// GET SPECIFIC USER
export const getUser = async(req: Request,res: Response) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found..." });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// UPDATE USER
export const updateUser = async(req: Request,res: Response) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if(!user){
            return res.status(404).json({ message: `User Not Found...` });
        }
        user = await userService.updateUser(user._id, { ...req.body});
        res.status(201).json({user: user, message: `User Updated Successfully...`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// DELETE USER
export const deleteUser = async(req: Request,res: Response) => {
    try {
        let user = await userService.getUserById(req.query.userId);
        if (!user) {
            return res.status(404).json({message:"User not found..."});
        }
        user = await userService.updateUser(user._id, {isDelete: true});
        res.status(200).json({user: user,message: `User Deleted Succesfully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};
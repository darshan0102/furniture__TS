import UserService from "../../services/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userService = new UserService();

declare global{
    namespace Express {
        interface Request {
            admin?: object;
        }
    }
}

// REGISTER ADMIN
export const registerAdmin = async(req: Request,res: Response) => {
    try {
        let admin : object | null = await userService.getUser({ email: req.body.email });
        // console.log(admin);
        if(admin){
            return res.status(400).json({ message: `Admin is Already Registerd...`});
        }
        let hashPassword : string = await bcrypt.hash(req.body.password, 10);
        // console.log(hashPassword);
        admin = await userService.addNewUser({
            ...req.body,
            password: hashPassword,
            isAdmin: true
        });
        res.status(201).json({admin: admin, message: `New Admin Is Added SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    } 
};

// LOGIN ADMIN
export const loginAdmin = async(req: Request,res: Response) => {
    try {
        let admin = await userService.getUser({email: req.body.email, isDelete: false});
        // console.log(admin);
        if (!admin) {
            return res.status(404).json({message:`Email Not Found....`});
        }
        let checkPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!checkPassword) {
            return res.status(401).json({message: `Password is Not Match...`});
        }
        let token : string = jwt.sign({ adminId: admin._id}, 'Admin');
        // console.log(token);
        res.status(200).json({ token, message: `Admin Login SuccesFully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// GET ALL ADMIN
export const getAllAdmin = async(req: Request,res: Response) => {
    try {
        let admin = await userService.getAllUser({isDelete: false , isAdmin:true});
        // console.log(admin);
        if(!admin){
            return res.status(404).json({ message: `Admin Data Not Found...!`});
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// GET SPECIFIC ADMIN
export const getAdmin = async(req: Request,res: Response) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        // console.log(admin);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found..." });
        }
        res.status(200).json(admin);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// UPDATE ADMIN
export const updateAdmin = async(req: Request,res: Response) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if(!admin){
            return res.status(404).json({ message: `Admin Not Found...` });
        }
        admin = await userService.updateUser(admin._id, { ...req.body});
        res.status(201).json({admin, message: `Admin Updated Successfully...`})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};

// DELETE ADMIN
export const deleteAdmin = async(req: Request,res: Response) => {
    try {
        let admin = await userService.getUserById(req.query.adminId);
        if (!admin) {
            return res.status(404).json({message:"Admin not found..."});
        }
        admin = await userService.updateUser(admin._id, {isDelete: true});
        res.status(200).json({admin,message: `Admin Deleted Succesfully...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..${console.error()}`});
    }
};
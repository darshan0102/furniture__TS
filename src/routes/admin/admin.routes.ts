import express from "express";
import { adminVerifyToken } from "../../helpers/adminVerifyToken";

import {
  registerAdmin,
  loginAdmin,
  getAllAdmin,
  getAdmin,
  updateAdmin,   
  deleteAdmin,
} from "../../controller/admin/admin.controller";

const adminRoutes = express.Router();

// REGISTER ADMIN
adminRoutes.post("/register-Admin", registerAdmin);

// LOGIN ADMIN
adminRoutes.post("/login-Admin", loginAdmin);

// GET ALL ADMIN
adminRoutes.get("/get-All-Admin", adminVerifyToken, getAllAdmin);

// GET ADMIN
adminRoutes.get("/get-Admin", adminVerifyToken, getAdmin);

// UPDATE ADMIN
adminRoutes.put("/update-Admin", adminVerifyToken, updateAdmin);

// DELETE ADMIN
adminRoutes.delete("/delete-Admin", adminVerifyToken, deleteAdmin);

export default adminRoutes;
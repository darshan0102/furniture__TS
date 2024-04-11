import express from "express";
import { userVerifyToken } from "../../helpers/userVerifyToken";

import {
  registerUser,
  loginUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
} from "../../controller/user/user.controller";

const userRoutes = express.Router();

// REGISTER User
userRoutes.post("/register-User", registerUser);

// LOGIN User
userRoutes.post("/login-User", loginUser);

// GET ALL User
userRoutes.get("/get-All-User", userVerifyToken , getAllUser);

// GET User
userRoutes.get("/get-User", userVerifyToken , getUser);

// UPDATE User
userRoutes.put("/update-User", userVerifyToken , updateUser);

// DELETE User
userRoutes.delete("/delete-User", userVerifyToken , deleteUser);

export default userRoutes;
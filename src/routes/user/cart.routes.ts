import express from "express";
const cartRoutes = express.Router();
import { userVerifyToken } from "../../helpers/userVerifyToken";

import {
    addToCart,
    getAllCart,
    getCart,
    updateCart,
    deleteCart
} from "../../controller/user/cart.controller";

// ADD CART
cartRoutes.post('/add-Cart', userVerifyToken, addToCart);

// GET ALL CART
cartRoutes.get('/get-All-Cart', userVerifyToken, getAllCart);

// GET SPECIFIC CART
cartRoutes.get('/get-Cart', userVerifyToken, getCart);

// UPDATE CART
cartRoutes.put('/update-cart', userVerifyToken, updateCart);

// DELETE CART
cartRoutes.delete('/delete-Cart', userVerifyToken, deleteCart);

export default cartRoutes;
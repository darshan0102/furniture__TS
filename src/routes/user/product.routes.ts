import express from "express";
const productRoute = express.Router();
import { userVerifyToken } from "../../helpers/userVerifyToken";

import {
    getAllProduct,
    getProduct
}  from "../../controller/user/product.controller";

// GET ALL PRODUCT
productRoute.get('/get-All-Product', userVerifyToken , getAllProduct);

// GET SPECIFIC PRODUCT
productRoute.get('/get-Product', userVerifyToken , getProduct);

export default productRoute;
import CartServices  from "../../services/cart.service";
import { Request, Response } from "express";
const cartService = new CartServices();

// GET ALL CART
export const getAllCart = async (req: Request,res: Response) => {
  try {
    let carts = await cartService
      .getAllCart({ isDelete: false })
    res.status(200).json(carts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error..` });
  }
};
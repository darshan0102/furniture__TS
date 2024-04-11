import CartServices from "../../services/cart.service";
import { Request, Response } from "express";

const cartService = new CartServices();

declare global {
    namespace Express {
        interface Request {
            cart?: any;
        }
    }
}

// ADD TO CART
export const addToCart = async (req: Request,res: Response) => {
    try {
        let cart = await cartService.getCart({
            user: (req.user as any )._id,
            cartItem: req.body.cartItem,
            isDelete: false
        });
        if(cart){
            return res.json({message:"Cart Already Exist..."});
        }
        cart = await cartService.addToCart({
            user: (req.user as any )._id,
            ...req.body
        });
        cart.save();
        return res.json({cart,message:"Cart Added successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

// GET ALL CART
export const getAllCart = async (req: Request,res: Response) => {
    try {
        let carts = await cartService.getAllCart({
            user: (req.user as any )._id,
            isDelete: false
        });
        // calculate total price for each items 
        carts = carts.map((item:any )=>{
            let quantity = item.cartItem.quantity;
            let unitPrice = item.cartItem.price;
            item.totalPrice=unitPrice*quantity;
            console.log(item);
            delete item.cartItem;
            console.log(item);
            return item;
        });
        res.status(200).json(carts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};

// GET SPECIFIC CART
export const getCart = async (req: Request,res: Response) => {
    try {
        let cart = await cartService.getCartById({
            _id: req.query.cartId,
            isDelete: false
        });
        if(!cart){
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        res.status(200).json(cart);  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error... ${console.error()}`});    
    }
};

// UPDATE CART
export const updateCart = async (req: Request,res: Response) => {
    try {
        let cart = await cartService.getCart({_id: req.query.cartId});
        if (!cart) {
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        cart = await cartService.updateCart(cart._id,  {...req.body});
        res.status(200).json({cart, message: `Cart Item Updated SuccessFully.....`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error... ${console.error()}`});
    }
};

// DELETE CART
export const deleteCart = async (req: Request,res: Response) => {
    try {
        let cart = await cartService.getCart({_id: req.query.cartId});
        if(!cart){
            return res.status(404).json({ message: `No Cart Found with this ID`});
        }
        cart = await cartService.updateCart(cart._id ,{isDelete : true});
        res.status(200).json({cart, message:`Cart Deleted Successfully......`}); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error... ${console.error()}`});
    }
}
import OrderServices  from "../../services/order.service";
import { Request, Response } from "express";
const orderService = new OrderServices();
import CartServices from "../../services/cart.service";
const cartService = new CartServices();

declare global {
    namespace Express {
        interface Request {
            order?: object;
        }
    }
}

// ADD NEW ORDER
export const addNewOrder = async(req: Request,res: Response) => {
    try {
        let cartItems = await cartService.getAllCart({ user: (req.user as any)._id, isDelete: false});
        // res.send(cartItems);
        if (!cartItems) {
            res.status(404).json({ message: `Cart Not Found...`});
        }
        // console.log(cartItems);
        let orderItems = await cartItems.map((item:any) => ({
            product: item.cartItem._id,
            quantity: item.quantity,
            price: item.cartItem.price
        }));
        // console.log(orderItems);
        let totalPrice = orderItems.reduce((total:any, item:any) => total + (item.price * item.quantity),0);
        // console.log(totalPrice);
        let newOrder = await orderService.addNewOrder({
            user: (req.user as any )._id,
            items: orderItems,
            totalAmount: totalPrice
        });
        newOrder.save();
        await cartService.updateMany({ user: (req.user as any )._id});
        res.status(201).json({newOrder, message: `Order Place Successfuly...`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

// GET ALL ORDER
export const getAllOrder = async (req: Request,res: Response) => {
    try {
        let orders = await orderService.getAllOrder({ user: (req.user as any )._id,  isDelete: false });
        console.log(orders);
        if (!orders) {
            res.status(404).json({ message: `Orders Not Found...`});
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

// GET SPECIFIC  ORDER
export const getOrder = async (req: Request,res: Response) => {
    try {
        let order = await orderService.getOrderById({_id: req.query.orderId, isDelete: false});
        console.log(order);
        if (!order) {
            res.status(404).json({ message: `Orders Not Found...`});
        }
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};

// DELETE ORDER
export const deleteOrder = async (req: Request,res: Response) => {
    try {
        let order = await orderService.getOrder({_id: req.query.orderId , isDelete:false});
        // console.log(order);
        if (!order) {
            res.status(404).json({ message: `Orders Not Found...`});
        }
        order = await orderService.updateOrder(order._id, {isDelete: true});
        res.status(200).json({order, message: `Order Deleted Successfully...`});
        // console.log(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error ${console.error()}`});
    }
};
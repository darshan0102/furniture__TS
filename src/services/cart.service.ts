import cartModel from "../model/cart.model";

export default class CartService {
    // ADD TO CART
    addToCart = async (body: any) => {
        return await cartModel.create(body);
    }

    // GET ALL CART
    getAllCart = async (body: any) => {
        return await cartModel.find(body).populate('user').populate('cartItem');
    }

    // GET SPECIFIC CART
    getCart = async (body: any) => {
        return await cartModel.findOne(body).populate('cartItem');
    }

    // GET SPECIFIC CART BY ID
    getCartById = async (body: any) => {
        return await cartModel.findById(body).populate('cartItem');
    }

    // UPDATE CART
    updateCart = async (id: string, body: any) => {
        return await cartModel.findByIdAndUpdate(id, {$set: body }, { new: true }).populate('cartItem');;
    }

    // DELETE CART
    deleteCart = async (id: string) => {
        return await cartModel.findByIdAndDelete(id).populate('cartItem');
    }

     //  UPDATE MANY 
     updateMany = async (body:any) => {
        return await cartModel.updateMany(body , {$set: body}, {new: true});
    }
}

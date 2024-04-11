import productModel from "../model/product.model";

export default class ProductService {
    // ADD PRODUCT
    addNewProduct = async (body:any) => {
        return await productModel.create(body);
    }

    // GET ALL PRODUCT
    getAllProduct = async (body:any) => {
        return await productModel.find(body);
    }

    // GET PRODUCT
    getProduct = async (body:any) => {
        return await productModel.findOne(body);
    }

    // GET PRODUCT BY ID
    getProductById = async (body:any) => {
        return await productModel.findById(body);
    }

    // UPDATE PRODUCT
    updateProduct = async (id: string , body:any) => {
        return await productModel.findByIdAndUpdate(id, {$set: body}, {new: true});
    }

    // DELETE PRODUCT
    deleteProduct = async (id:string) => {
        return await productModel.findByIdAndDelete(id);
    }
}
import ProductServices from "../../services/product.service";
const productServiece = new ProductServices();
import { Request, Response } from "express";
// import  ReviewServieces  from "../../services/review.service";
// const reviewServiece = new ReviewServieces();


// GET ALL PRODUCT
export const getAllProduct = async (req: Request,res: Response) => {
    try {
        let product = await productServiece.getAllProduct({ isDelete : false});
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
};

// GET SPECIFIC PRODUCT
export const getProduct = async (req: Request,res: Response) => {
    try {
        let product = await productServiece.getProductById(req.query.productId);
        // let review = await reviewServiece.getAllReview(req.query);
        // console.log(review);
        // let totalRating = review.reduce((total:number, item:any) => total + item.rating, 0);
        // let avgRating = totalRating / review.length;
        // console.log(avgRating);
        res.status(200).json({product});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error..`});
    }
}
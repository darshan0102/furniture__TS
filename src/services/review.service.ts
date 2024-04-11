import mongoose from "mongoose";
import reviewModel from "../model/review.model";

export default class ReviewService {
    // ADD REVIEW
    addNewReview = async (body: any) => {
        return await reviewModel.create(body);
    }

    // GET ALL REVIEW
    getAllReview = async (query: any) => {
        let product = query.productId && query.productId !== "" ? [
            {
                $match: { product: new mongoose.Types.ObjectId(query.productId) }
            }
        ] : [];
        let find = [
            { $match: { isDelete: false } },
            ...product,

        ];
        
        let result = await reviewModel.aggregate(find);
        return result;
    }

    // GET SPECIFIC REVIEW
    getReview = async (body: any) => {
        return await reviewModel.findOne(body);
    }

    // GET SPECIFIC REVIEW BY ID
    getReviewById = async (body: any) => {
        return await reviewModel.findById(body);
    }

    // UPDATE REVIEW
    updateReview = async (id: string, body: any) => {
        return await reviewModel.findByIdAndUpdate(id, {$set: body }, { new: true });
    }

    // DELETE REVIEW
    deleteReview = async (id: string) => {
        return await reviewModel.findByIdAndDelete(id);
    }
}
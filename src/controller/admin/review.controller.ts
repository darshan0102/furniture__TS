import ReviewServices from "../../services/review.service";
import { Request, Response } from "express";
const reviewService = new ReviewServices();

// GET ALL REVIEW
export const getAllReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getAllReview(req.query);
        res.status(200).json(review);
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
};

// DELETE REVIEW
export const deleteReview = async(req: Request,res: Response) => {
    try {
        let review = await reviewService.getReviewById(req.query.Id);
        if(!review){
            return res.status(404).json({Message: 'Review is not found'});
        }
        review = await reviewService.updateReview(review._id , {isDelete: true});
        res.status(202).json({review , Message: 'Review is Delete...'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ Message: 'Internal server Error' });
    }
}
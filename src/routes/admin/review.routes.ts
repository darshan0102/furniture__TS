import express from 'express';
const ReviewRoutes = express.Router();
import {  adminVerifyToken }  from "../..//helpers/adminVerifyToken";

import {  getAllReview ,  deleteReview } from "../../controller/admin/review.controller";


// GET ALL REVIEW
ReviewRoutes.get('/get-all-review' , adminVerifyToken,  getAllReview);

// DELETE REVIEW
ReviewRoutes.delete('/delete-review' , adminVerifyToken , deleteReview);


export default ReviewRoutes;
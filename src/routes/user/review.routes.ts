const express = require('express');
const ReviewRoutes = express.Router();
import { userVerifyToken } from "../../helpers/userVerifyToken";

import { addReview, getAllReview ,  deleteReview } from "../../controller/user/review.controller";

// ADD REVIEW
ReviewRoutes.post('/add-New-Review' , userVerifyToken,  addReview);

// GET ALL REVIEW
ReviewRoutes.get('/get-All-Review' , userVerifyToken,  getAllReview);

// DELETE REVIEW
ReviewRoutes.delete('/delete-Review' , userVerifyToken , deleteReview);


export default ReviewRoutes;
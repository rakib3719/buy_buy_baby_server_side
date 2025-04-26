import { Request, Response } from "express";

import { productsReviewModel } from "../models/reviewModel";
import { updateProductReviewStats } from "../utils/productsUtils";

export const addProductReview = async(req:Request, res:Response)=>{


    try {

        const review = req.body;

        const newReview = new productsReviewModel(review);
        const data = await newReview.save();
     await  updateProductReviewStats(review.productId)
        res.status(201).json({
            message:'review added successfully',
            data:data
        })
        
        
    } catch (error) {
        
        res.status(401).json({

            message:'something went wrong',
            error:error
        })
    }
}


export const getProductReview =async(req:Request, res:Response)=>{
    try {

        const productId = req.params.id;
        const data = await productsReviewModel.find({productId}).sort({createdAt: - 1});
        res.status(201).json({
            message:'products find sucessfully',
            data:data
        })
        
    } catch (error) {
        res.status(401).json({
            message:'something went worng',
            error:error
        })
    }
}
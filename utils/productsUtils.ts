import mongoose from "mongoose";
import { productsModel } from "../models/productsModel";
import { productsReviewModel } from "../models/reviewModel";

export const updateProductReviewStats = async (productId: mongoose.Types.ObjectId | string) => {
    const objectId = new mongoose.Types.ObjectId(productId);
  
    const stats = await productsReviewModel.aggregate([
      {
        $match: { productId: objectId }, // proper type
      },
      {
        $group: {
          _id: "$productId",
          reviewsCount: { $sum: 1 },
          rating: { $avg: "$rating" },
        },
      },
    ]);
  
    if (stats.length > 0) {
      await productsModel.findByIdAndUpdate(objectId, {
        reviewsCount: stats[0].reviewsCount,
        rating: stats[0].rating,
      });
    }
  };
  
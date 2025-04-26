"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductReviewStats = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productsModel_1 = require("../models/productsModel");
const reviewModel_1 = require("../models/reviewModel");
const updateProductReviewStats = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const objectId = new mongoose_1.default.Types.ObjectId(productId);
    const stats = yield reviewModel_1.productsReviewModel.aggregate([
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
        yield productsModel_1.productsModel.findByIdAndUpdate(objectId, {
            reviewsCount: stats[0].reviewsCount,
            rating: stats[0].rating,
        });
    }
});
exports.updateProductReviewStats = updateProductReviewStats;

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductReview = exports.addProductReview = void 0;
const reviewModel_1 = require("../models/reviewModel");
const productsUtils_1 = require("../utils/productsUtils");
const addProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = req.body;
        const newReview = new reviewModel_1.productsReviewModel(review);
        const data = yield newReview.save();
        yield (0, productsUtils_1.updateProductReviewStats)(review.productId);
        res.status(201).json({
            message: 'review added successfully',
            data: data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'something went wrong',
            error: error
        });
    }
});
exports.addProductReview = addProductReview;
const getProductReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const data = yield reviewModel_1.productsReviewModel.find({ productId }).sort({ createdAt: -1 });
        res.status(201).json({
            message: 'products find sucessfully',
            data: data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'something went worng',
            error: error
        });
    }
});
exports.getProductReview = getProductReview;

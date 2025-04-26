"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsReviewController_1 = require("../controller/ProductsReviewController");
const router = (0, express_1.Router)();
router.post('/add', ProductsReviewController_1.addProductReview);
router.get('/:id', ProductsReviewController_1.getProductReview);
exports.default = router;

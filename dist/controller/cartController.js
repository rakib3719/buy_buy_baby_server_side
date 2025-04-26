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
exports.getCart = exports.deleteCart = exports.updateQuantity = exports.addCart = void 0;
const cartModel_1 = require("../models/cartModel");
const productsModel_1 = require("../models/productsModel");
const addCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartData = req.body;
        const userId = cartData.userId;
        const productId = cartData.productId;
        const isExist = yield cartModel_1.cartModel.findOne({ userId, productId });
        if (isExist) {
            res.status(401).json({
                message: 'Product already added to your cart'
            });
            return;
        }
        const newCartData = new cartModel_1.cartModel(cartData);
        const data = yield newCartData.save();
        res.status(201).json({
            message: 'Suceccfully added cart!',
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
exports.addCart = addCart;
const updateQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const userId = data.userId;
        const productId = data.productId;
        const action = data.action;
        // if(action !== 'plus' && "minus"){
        //     res.status(401).json({
        //         message:'action must be plus or minus keyword accept'
        //     })
        //     return;
        // }
        const findCartProduct = yield cartModel_1.cartModel.findOne({ userId, productId });
        if (!findCartProduct) {
            res.status(401).json({
                message: 'Product not found!',
            });
            return;
        }
        if (action === 'minus' && findCartProduct.quantity <= 1) {
            res.status(400).json({
                message: 'Quantity cannot be less than 1',
                currentQuantity: findCartProduct.quantity
            });
            return;
        }
        const updateQuantity = action === 'plus' ? 1 : -1;
        const updateProduct = yield cartModel_1.cartModel.findOneAndUpdate({ userId, productId }, { $inc: { quantity: updateQuantity }, }, { new: true });
        res.status(201).json({
            message: 'Update successfully',
            data: updateProduct
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'something went wrong',
            error: error
        });
    }
});
exports.updateQuantity = updateQuantity;
const deleteCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = req.body;
        // 1. Validate required fields
        if (!userId || !productId) {
            res.status(400).json({
                message: 'Both userId and productId are required'
            });
            return;
        }
        // 2. Validate ObjectId format
        // if (!mongoose.Types.ObjectId.isValid(userId) || 
        //     !mongoose.Types.ObjectId.isValid(productId)) {
        //     res.status(400).json({
        //         message: 'Invalid ID format'
        //     });
        //     return 
        // }
        // 3. Check if item exists
        const existingItem = yield cartModel_1.cartModel.findOne({ userId, productId });
        if (!existingItem) {
            res.status(404).json({
                message: 'Item not found in cart'
            });
            return;
        }
        // 4. Delete the item
        const result = yield cartModel_1.cartModel.deleteOne({ userId, productId });
        res.status(200).json({
            message: 'Item removed from cart',
            data: result
        });
    }
    catch (error) {
        console.error('Delete cart error:', error);
        res.status(500).json({
            message: 'Failed to remove item',
            error: error instanceof Error ? error.message : error
        });
    }
});
exports.deleteCart = deleteCart;
const getCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const id = userInfo.userId;
        const findProductId = yield cartModel_1.cartModel.find({ userId: id });
        const productIds = findProductId.map(item => item.productId);
        const product = yield productsModel_1.productsModel.find({ _id: { $in: productIds } });
        res.status(201).json({
            message: 'Success',
            data: product,
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'Smething went worng',
            error: error
        });
    }
});
exports.getCart = getCart;

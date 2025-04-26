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
exports.getMyOrder = exports.getAllOrder = exports.orderSave = void 0;
const orderModel_1 = require("../models/orderModel");
const orderSave = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const newOrder = new orderModel_1.orderModel(orderData);
        const data = yield newOrder.save();
        res.status(201).json({
            message: 'Successfully added order',
            data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'Something went wrong!',
            error
        });
    }
});
exports.orderSave = orderSave;
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, paymentType, paymentMethod, status, fromDate, toDate, userId, email, mobileNumber } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search } },
                { email: { $regex: email } },
                { mobileNumber: { $regex: mobileNumber } }
            ];
        }
        if (paymentType) {
            filter.paymentType = paymentType;
        }
        if (paymentMethod) {
            filter.paymentMethod = paymentMethod;
        }
        if (status) {
            filter.status = status;
        }
        if (fromDate && toDate) {
            filter.createdAt = {
                $gte: new Date(fromDate),
                $lte: new Date(toDate)
            };
        }
        const data = yield orderModel_1.orderModel.find(filter).skip(skip).limit(limit);
        res.status(201).json({
            message: 'all order find well!',
            data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'Something went wrong!',
            error
        });
    }
});
exports.getAllOrder = getAllOrder;
const getMyOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const data = yield orderModel_1.orderModel.find({ userId });
        res.status(201).json({
            message: 'Sucess',
            data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'Something went wrong!',
            error
        });
    }
});
exports.getMyOrder = getMyOrder;

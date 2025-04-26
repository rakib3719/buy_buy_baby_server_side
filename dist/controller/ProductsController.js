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
exports.getProductById = exports.updateProducts = exports.deleteProducts = exports.addProducts = exports.getProducts = void 0;
const productsModel_1 = require("../models/productsModel");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, minPrice, maxPrice, category, sort, brand } = req.query;
        let filter = {};
        if (search) {
            filter.productName = { $regex: search, $options: "i" };
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        if (category) {
            filter.category = category;
        }
        if (brand) {
            filter.brand = brand;
        }
        let sortOption = {};
        if (sort === "highToLow") {
            sortOption.price = -1;
        }
        else if (sort === "lowToHigh") {
            sortOption.price = 1;
        }
        else {
            sortOption.createdAt = -1; // default sort
        }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const data = yield productsModel_1.productsModel.find(filter).sort(sortOption).skip(skip).limit(limit);
        res.status(200).json({
            message: "Products fetched successfully",
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
});
exports.getProducts = getProducts;
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = req.body;
        const newProducts = new productsModel_1.productsModel(products);
        const saveProducts = yield newProducts.save();
        res.status(201).json({
            message: 'Sucessfullly added',
            data: saveProducts
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'somtething went wrong',
            error: error
        });
    }
});
exports.addProducts = addProducts;
const deleteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id, 'id to asca');
    try {
        const deletedProducts = yield productsModel_1.productsModel.deleteOne({ _id: id });
        res.status(201).json({
            message: 'deleted successfully',
            data: deletedProducts
        });
    }
    catch (error) {
        res.status(401).json({
            message: "Someting went worng!",
            error: error
        });
    }
});
exports.deleteProducts = deleteProducts;
const updateProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const productsData = req.body;
        const update = yield productsModel_1.productsModel.findByIdAndUpdate(id, productsData, {
            new: true,
            runValidators: true
        });
        if (update) {
            res.status(201).json({
                message: 'sucessfully update',
                data: update
            });
        }
    }
    catch (error) {
        res.status(401).json({
            message: 'something went worng!',
            error: error
        });
    }
});
exports.updateProducts = updateProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const data = yield productsModel_1.productsModel.findOne({ _id: id });
        res.status(201).json({
            message: 'Product find sucessfully',
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
exports.getProductById = getProductById;

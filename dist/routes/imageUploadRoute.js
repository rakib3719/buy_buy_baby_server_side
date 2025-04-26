"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = require("express");
const cloudinary_1 = __importDefault(require("cloudinary"));
const multer_1 = __importDefault(require("../middleware/multer"));
const router = (0, express_1.Router)();
// Cloudinary configuration
cloudinary_1.default.config({
    cloud_name: 'dcirauywt',
    api_key: 724993446295319,
    api_secret: 'Ksvl9KtctWIQhCSnYZ6-BNa7d70',
});
dotenv_1.default.config();
router.post('/upload', multer_1.default.single('image'), (req, res) => {
    console.log(req.body, 'ha vaidddd');
    cloudinary_1.default.uploader.upload(req.body.imgUrl, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
});
exports.default = router;

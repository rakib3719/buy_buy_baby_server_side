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
exports.userLogin = exports.saveUser = exports.getUser = void 0;
const userModels_1 = require("../models/userModels");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModels_1.userModel.find();
        res.status(200).json({
            users: user
        });
    }
    catch (error) {
        res.status(301).json({
            message: 'Someting went wrong',
            error: error
        });
    }
});
exports.getUser = getUser;
const saveUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = req.body;
        const myPlaintextPassword = user.password;
        const saltRounds = 16;
        const password = bcrypt_1.default.hash(myPlaintextPassword, saltRounds);
        user.password = password;
        const newUser = new userModels_1.userModel(user);
        const data = yield newUser.save();
        res.status(201).json({
            message: 'user create sucessfully',
            data: data
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'something went wrong!',
            error: error
        });
    }
});
exports.saveUser = saveUser;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, mobileNumber, password } = req.body;
        if (!email && !mobileNumber) {
            res.status(401).json({
                message: 'Email or password must be needed'
            });
            return;
        }
        const user = yield userModels_1.userModel.findOne({
            $or: [{ email }, { mobileNumber }]
        });
        if (!user) {
            res.status(401).json({
                message: 'Email or mobile number not found',
            });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                message: 'Incorrect password',
            });
            return;
        }
        res.status(201).json({
            message: 'Login sucessfully',
            data: user
        });
    }
    catch (error) {
        res.status(401).json({
            message: 'Something went worng!',
            error: error
        });
    }
});
exports.userLogin = userLogin;

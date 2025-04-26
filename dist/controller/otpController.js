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
exports.postOtp = void 0;
const otpModels_1 = require("../models/otpModels");
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "bannah76769@gmail.com",
        pass: "mxai xaxm gkwc moor",
    },
});
const otpSend = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    const info = yield transporter.sendMail({
        from: '"Secure Authentication" <bannah76769@gmail.com>', // Sender name & email
        to: email, // Receiver email
        subject: "🔐 Your OTP Code for Verification", // Subject with security icon
        text: `Your One-Time Password (OTP) is: ${otp}. This OTP is valid for 4 minutes.`, // Plain text (Backup)
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
            <h2 style="text-align: center; color: #333;">🔐 OTP Verification</h2>
            <p style="text-align: center; font-size: 18px; color: #555;">Your One-Time Password (OTP) is:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #aa1936; padding: 10px; border: 2px dashed #aa1936; display: inline-block; margin: auto;">
              ${otp}
            </div>
            <p style="text-align: center; font-size: 14px; color: #777; margin-top: 10px;">This OTP is valid for <b>4 minutes</b>. Do not share it with anyone.</p>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
            <p style="text-align: center; font-size: 12px; color: #888;">If you did not request this OTP, please ignore this email.</p>
          </div>
        `,
    });
});
const postOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const otpData = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const existEmail = yield otpModels_1.otpModel.findOne({ email: req.body.email });
        if (existEmail) {
            yield otpModels_1.otpModel.deleteOne({ email: req.body.email });
        }
        const otpRecord = new otpModels_1.otpModel({
            email: otpData.email,
            otp: otp,
            expireDate: new Date(Date.now() + 3 * 60 * 1000)
        });
        yield otpSend(otpData.email, otp);
        yield otpRecord.save();
        res.status(201).json({
            message: "Otp save succcessfully",
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            error: error,
            message: "something went wrong",
            success: false
        });
    }
});
exports.postOtp = postOtp;

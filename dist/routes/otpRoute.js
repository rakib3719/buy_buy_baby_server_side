"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const otpController_1 = require("../controller/otpController");
const router = (0, express_1.Router)();
router.post('/', otpController_1.postOtp);
exports.default = router;

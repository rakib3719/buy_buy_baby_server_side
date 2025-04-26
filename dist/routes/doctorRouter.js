"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const doctorController_1 = require("../controller/doctorController");
const router = (0, express_1.Router)();
router.post('/add', doctorController_1.addDoctor);
exports.default = router;

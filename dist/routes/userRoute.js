"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controller/userControllers");
const router = (0, express_1.Router)();
router.get('/', userControllers_1.getUser);
router.post('/login', userControllers_1.userLogin);
router.post('/save', userControllers_1.saveUser);
exports.default = router;

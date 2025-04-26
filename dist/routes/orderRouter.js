"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controller/orderController");
const router = (0, express_1.Router)();
router.post('/add', orderController_1.orderSave);
router.get('/', orderController_1.getAllOrder);
router.get('/myOrder/:userId', orderController_1.getMyOrder);
exports.default = router;

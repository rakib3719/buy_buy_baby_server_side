"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../controller/ProductsController");
const router = (0, express_1.Router)();
router.post('/add', ProductsController_1.addProducts);
router.delete('/delete/:id', ProductsController_1.deleteProducts);
router.patch('/update/:id', ProductsController_1.updateProducts);
router.get('/', ProductsController_1.getProducts);
router.get('/:id', ProductsController_1.getProductById);
exports.default = router;

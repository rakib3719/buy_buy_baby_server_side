import { Router } from "express";

import { getAllOrder, getMyOrder, orderSave } from "../controller/orderController";

const router:Router = Router();


router.post('/add', orderSave);
router.get('/', getAllOrder);
router.get('/myOrder/:userId', getMyOrder);

export default router;
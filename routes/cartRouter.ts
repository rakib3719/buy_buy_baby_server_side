import { Router } from "express";
import { addCart, deleteCart, getCart, updateQuantity } from "../controller/cartController";

const router:Router = Router();


router.post('/add', addCart);
router.get('/', getCart);
router.patch('/update', updateQuantity);
router.delete('/delete', deleteCart)



export default router;
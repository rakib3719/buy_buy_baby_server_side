import { Router } from "express";
import { addProductReview, getProductReview } from "../controller/ProductsReviewController";


const router:Router = Router();


router.post('/add', addProductReview);
router.get('/:id', getProductReview)


export default router;
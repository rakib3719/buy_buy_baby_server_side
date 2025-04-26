import { Router } from "express";
import { addProducts, deleteProducts, getProductById, getProducts, updateProducts } from "../controller/ProductsController";

const router:Router = Router();

router.post('/add',addProducts )
router.delete('/delete/:id', deleteProducts)
router.patch('/update/:id', updateProducts);
router.get('/', getProducts);
router.get('/:id', getProductById)




export default router;
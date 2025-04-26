import { Router } from "express";
import { getUser, saveUser, userLogin } from "../controller/userControllers";

 const router:Router = Router();

router.get('/', getUser)
router.post('/login', userLogin)
router.post('/save', saveUser)


export default router;
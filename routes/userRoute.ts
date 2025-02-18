import { Router } from "express";
import { getUser } from "../controller/userControllers";

 const router:Router = Router();

router.get('/', getUser)

export default router;
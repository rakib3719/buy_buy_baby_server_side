import { Router } from "express";
import { addDoctor } from "../controller/doctorController";

const router:Router = Router();
router.post('/add', addDoctor);


export default router;
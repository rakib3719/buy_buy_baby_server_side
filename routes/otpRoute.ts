import { Router } from "express";
import { postOtp } from "../controller/otpController";

const router:Router =Router();


router.post('/', postOtp)

export default router;
import { Request, Response } from "express";
import { otpModel } from "../models/otpModels";
import nodemailer from 'nodemailer'





const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "bannah76769@gmail.com",
      pass: "mxai xaxm gkwc moor",
    },
  });

const otpSend= async(email:string, otp:string)=>{
    const info = await transporter.sendMail({
        from: '"Secure Authentication" <bannah76769@gmail.com>', // Sender name & email
        to: email, // Receiver email
        subject: "🔐 Your OTP Code for Verification", // Subject with security icon
        text: `Your One-Time Password (OTP) is: ${otp}. This OTP is valid for 4 minutes.`, // Plain text (Backup)
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: #f9f9f9;">
            <h2 style="text-align: center; color: #333;">🔐 OTP Verification</h2>
            <p style="text-align: center; font-size: 18px; color: #555;">Your One-Time Password (OTP) is:</p>
            <div style="text-align: center; font-size: 24px; font-weight: bold; color: #aa1936; padding: 10px; border: 2px dashed #aa1936; display: inline-block; margin: auto;">
              ${otp}
            </div>
            <p style="text-align: center; font-size: 14px; color: #777; margin-top: 10px;">This OTP is valid for <b>4 minutes</b>. Do not share it with anyone.</p>
            <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
            <p style="text-align: center; font-size: 12px; color: #888;">If you did not request this OTP, please ignore this email.</p>
          </div>
        `,
      });

}


export const postOtp = async (req:Request, res:Response)=>{
   try {
    const otpData = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
const existEmail =await otpModel.findOne({email:req.body.email})
if(existEmail){
    await otpModel.deleteOne({email:req.body.email})
}

    const otpRecord = new otpModel({
        email:otpData.email,
        otp:otp,
        expireDate: new Date(Date.now() + 3 * 60 * 1000)  


    })

    await otpSend(otpData.email, otp)
    
    await otpRecord.save()
    


    res.status(201).json({
        message:"Otp save succcessfully",
        success:true
    })
   } catch (error) {
res.status(500).json({
    error:error,
    message:"something went wrong",
    success:false
})
   }
}
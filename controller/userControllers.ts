import { Request, Response } from "express";
import { userModel } from "../models/userModels";
import bcrypt from 'bcrypt'


export const getUser =async (req:Request, res: Response)=>{
  try {
    const user = await userModel.find();
    res.status(200).json({
        users:user
    })
    
  } catch (error) {
    res.status(301).json({

        message:'Someting went wrong',
        error:error
    })
  }
}

export const saveUser = async(req:Request, res:Response)=>{


  try {
 let user = req.body;
    const myPlaintextPassword = user.password;
    const saltRounds = 16
const password = bcrypt.hash(myPlaintextPassword, saltRounds);
user.password = password

    const newUser = new userModel(user);
    const data =await newUser.save();
    res.status(201).json({
      message:'user create sucessfully',
      data:data
    })
    
  } catch (error) {
    res.status(401).json({
      message:'something went wrong!',
      error:error
    })
  }
}

export const userLogin = async(req:Request, res:Response)=>{
 
 try{

  const {email, mobileNumber, password}= req.body;


  if(!email && !mobileNumber){
    res.status(401).json({
      message:'Email or password must be needed'
    })
    return;
  }
  const user = await userModel.findOne({

    $or:[{email}, {mobileNumber}]
  })
  if (!user) {
 res.status(401).json({
      message: 'Email or mobile number not found',
    });
    return;
  }
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
 res.status(401).json({
    message: 'Incorrect password',
  });
  return
}

res.status(201).json({
  message:'Login sucessfully',
  data:user
})

 }
  catch (error) {
    res.status(401).json({
      message:'Something went worng!',
      error:error
    })
  }
}
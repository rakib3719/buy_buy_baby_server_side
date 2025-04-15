import { Request, Response } from "express";
import { userModel } from "../models/userModels";

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
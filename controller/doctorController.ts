import { Request, Response } from "express";
import { doctorModel } from "../models/doctorModels";

export const addDoctor = async(req:Request, res:Response)=>{
    try {
        
        const data = req.body;


        const exist = await doctorModel.findOne({email:data?.email})
        if(exist){
            res.status(400).json({
                message:'email already exist'
            })
            return;
        }
      
    const newDoctor = new doctorModel(data);

    const saveDoctor = await newDoctor.save()
    res.status(200).json({
        mesage:"Success",
        data:saveDoctor
    })

    } catch (error) {
        console.log(error, 'ki error hoise re');
        res.status(401).json({
          
            message:'something went wrong',
            error:error
        })
    }
}
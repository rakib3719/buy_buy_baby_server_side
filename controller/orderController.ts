import { query, Request, Response } from "express";
import { orderModel } from "../models/orderModel";

export const orderSave = async(req:Request, res:Response)=>{
    try {
        
const orderData = req.body;
const newOrder = new orderModel(orderData);
const data = await newOrder.save();
res.status(201).json({
    message:'Successfully added order',
    data
})

    } catch (error) {
        res.status(401).json({
            message:'Something went wrong!',
            error
        })
    }
};


export const getAllOrder = async(req:Request, res:Response) =>{
    try {
        const {search, paymentType, paymentMethod, status, fromDate, toDate, userId, email,
            mobileNumber


        } = req.query;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        let filter:any = {};

        if(search){
            filter.$or = [
             {name: {$regex: search}},
             {email: {$regex: email}},
             {mobileNumber: {$regex: mobileNumber}}



            ]
        }

        if(paymentType){
            filter.paymentType = paymentType
        }

        if(paymentMethod){
            filter.paymentMethod = paymentMethod
        }

        if(status){
            filter.status = status
        }

        if(fromDate && toDate){
            filter.createdAt = {
                $gte:new Date (fromDate as string),
                $lte: new Date (toDate as string)
            }
        }

        const data = await orderModel.find(filter).skip(skip).limit(limit);
        res.status(201).json({
            message:'all order find well!',
            data
        })
        
    } catch (error) {
        res.status(401).json({
            message:'Something went wrong!',
            error
        })
    }
}

export const getMyOrder  = async(req:Request, res:Response)=>{
    try {
        
const {userId} = req.params;

const data = await orderModel.find({userId});
res.status(201).json({
    message:'Sucess',
    data
})


    } catch (error) {
        res.status(401).json({
            message:'Something went wrong!',
            error
        })
    }
}
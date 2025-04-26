import { Request, Response } from "express"
import { cartModel } from "../models/cartModel";
import { error } from "console";
import { productsModel } from "../models/productsModel";
import mongoose from "mongoose";

export const addCart = async(req:Request, res:Response)=>{


try {
    const cartData = req.body;
    const userId = cartData.userId;
    const productId = cartData.productId;


    const isExist = await cartModel.findOne({userId, productId});
    if(isExist){
        res.status(401).json({
            message:'Product already added to your cart'
        })
        return
    }
    const newCartData =  new cartModel(cartData);
    const data = await newCartData.save();
    res.status(201).json({
        message:'Suceccfully added cart!',
        data:data
    })
    
} catch (error) {
    res.status(401).json({
          
        message:'something went wrong',
        error:error
    })
}


}

export const updateQuantity = async(req:Request, res:Response)=>{
    try {
        const data = req.body;
        const userId = data.userId;
        const productId = data.productId
        const action = data.action;

        // if(action !== 'plus' && "minus"){
        //     res.status(401).json({
        //         message:'action must be plus or minus keyword accept'
        //     })
        //     return;
        // }

const findCartProduct = await cartModel.findOne({userId, productId});
if(!findCartProduct){
    res.status(401).json({
        message:'Product not found!',
        
    })
    return;
}

if (action === 'minus' && findCartProduct.quantity <= 1) {
res.status(400).json({
        message: 'Quantity cannot be less than 1',
        currentQuantity: findCartProduct.quantity
    });
    return 
}

const updateQuantity = action === 'plus'? 1 : -1


const updateProduct =await cartModel.findOneAndUpdate({userId, productId}, {$inc: {quantity: updateQuantity}, }, {new: true});
res.status(201).json({
    message:'Update successfully',
    data:updateProduct
})
        
    } catch (error) {
        res.status(401).json({
          
            message:'something went wrong',
            error:error
        })
    }
}

export const deleteCart = async (req: Request, res: Response) => {
    try {
        const { userId, productId } = req.body; 
        

        // 1. Validate required fields
        if (!userId || !productId) {
         res.status(400).json({
                message: 'Both userId and productId are required'
            });
        
            return
        
        }

        // 2. Validate ObjectId format
        // if (!mongoose.Types.ObjectId.isValid(userId) || 
        //     !mongoose.Types.ObjectId.isValid(productId)) {
        //     res.status(400).json({
        //         message: 'Invalid ID format'
        //     });
        //     return 
        // }

        // 3. Check if item exists
        const existingItem = await cartModel.findOne({ userId, productId });
        if (!existingItem) {
            res.status(404).json({
                message: 'Item not found in cart'
            });
            return
        }

        // 4. Delete the item
        const result = await cartModel.deleteOne({ userId, productId });
        
        res.status(200).json({
            message: 'Item removed from cart',
            data: result
        });

    } catch (error) {
        console.error('Delete cart error:', error);
        res.status(500).json({ // ✅ 500 for server errors
            message: 'Failed to remove item',
            error: error instanceof Error ? error.message : error
        });
    }
}
export const getCart = async(req:Request, res:Response)=>{

    try {

        const userInfo = req.body;
        const id = userInfo.userId
        const findProductId = await cartModel.find({userId:id});
        const productIds = findProductId.map(item => item.productId)
        const product = await productsModel.find({_id: {$in: productIds}});
        res.status(201).json({
            message:'Success',
            data:product,

        })
        
    } catch (error) {
        res.status(401).json({
            message:'Smething went worng',
            error:error
        })
    }

}
import mongoose, { Document, Schema } from "mongoose";

interface ProductReview extends Document{
name:string,
email:string,
rating:number,
comment:string,
productId:mongoose.Types.ObjectId,
createdAt: Date;
updatedAt: Date;


}

const productsReviewSchema = new Schema<ProductReview> (

  {

    name:{type:String, required:true},
    email:{type:String, required:true},
    rating:{type:Number, required:true},
    comment:{type:String, required:true},
    productId:{ type: Schema.Types.ObjectId, required:true}
  


  },
  { timestamps: true }
 
)


export const productsReviewModel = mongoose.model<ProductReview>('productsReview', productsReviewSchema)




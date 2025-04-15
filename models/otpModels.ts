import mongoose, { Document, Schema } from "mongoose";
type Role = "doctor" | "admin" | "user"
interface Otp extends Document {
    email:string,
    otp:string,
    expireDate:Date,
    mobileNumber?: any,
role:Role,
imgUrl?:string,
name:String
}
const otpSchema = new Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required: false,
    
    }
    ,
    mobileNumber:{
        type:Schema.Types.Mixed,
        required: false,
    },
    imgUrl:{
        type:String,
        required: false,
    },
    role:{
        type:String,
        required:true,
        enum: ["doctor", "admin" ,  "user"]
    },
    otp:{
        type:String,
        required:true
    },
    expireDate:{
        type:Date,
        required:true,
        expires:240
    }
})

export const otpModel = mongoose.model<Otp>('otp', otpSchema)
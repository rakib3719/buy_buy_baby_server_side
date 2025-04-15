import mongoose, { Schema, Document } from "mongoose"

type Role = "doctor" | "admin" | "user"
interface User extends Document{
name:string,
email?:string,
mobileNumber?: any,
role:Role,
imgUrl?:string
}


const userSchema = new Schema<User>({
name:{
    type: String,
    required:true
},
email:{
    type:String,
    required: false,
    unique:true

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
}

})

export const userModel = mongoose.model<User>('users', userSchema)
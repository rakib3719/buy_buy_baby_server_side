import mongoose, { Schema, Document } from "mongoose"

type Role = "doctor" | "admin" | "user" | "manager" | "modaretor"
interface User extends Document{
name:string,
email?:string,
mobileNumber?: any,
role:Role,
imgUrl?:string,
password:string
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
    unique:true
},
imgUrl:{
    type:String,
    required: false,
},
password:{

    type:String,
    required:true
},
role:{
    type:String,
    required:true,
    enum: ["doctor", "admin" ,  "user", "manager", "modaretor"]
}

})

export const userModel = mongoose.model<User>('users', userSchema)
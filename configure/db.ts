
import mongoose from "mongoose"

const connectDB = async()=>{


try {
   const conn =await mongoose.connect(process.env.MONGO_URI as string )
   console.log(`moongdo db connected `);
    
} catch (error:any) {
    console.log(error.message, "error");
}
}

export default connectDB;
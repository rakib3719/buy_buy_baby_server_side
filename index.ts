import app from "./app";
import dotenv from 'dotenv'

const port = process.env.PORT || "5000"
dotenv.config();

app.listen(port, ()=>{

    console.log(`Hello Baby server runnig on ${port }`);
})
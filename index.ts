import app from "./app";
import dotenv from 'dotenv'

const port = process.env.PORT || "5000"
dotenv.config();

app.listen(port, ()=>{

    console.log(`babycare server runnig on ${port }`);
})
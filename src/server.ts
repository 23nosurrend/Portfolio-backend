import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import welcome from './routes/welcomeRoutes'
import blog from "./routes/createBlogRoute"
import getAll from "./routes/readAllRoute"
dotenv.config();
const port = 3000;
const app = express();

// create AP endpoint
 app.use("/welcome", welcome)
 app.use("/write",blog)
 app.use("/get",getAll)
 app.use("/get/one",getAll)









const connectMongodb=()=>{
    const mongoPASS=process.env.MONGOPASS
    if(!mongoPASS){
        console.log("Can not read mongoo string");
        return;
    }else{
        mongoose.connect(mongoPASS)
        .then(()=>{
            console.log("dataBase successfully connected")
        }).catch((err:any)=>{
            console.log("dataBase failed to connect:",err)
        })
    }

}



app.listen(port, () => {
    console.log("Our server is running on:", port);
    connectMongodb();
})




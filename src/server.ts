import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import welcome from './routes/welcomeRoutes'
import blog from "./routes/createBlogRoute"
import getAll from "./routes/readAllRoute"
import deleteBlog from "./routes/deleteBlogRoute"
import comment from "./routes/commentRoute"
import updateBlog from "./routes/updateBlogRoute"
import admin from "./routes/userRoute"
import protectedRouter from "./routes/protectedRoute"
dotenv.config();
const port = 3000;
const app = express();

// create AP endpoint
 app.use("/welcome", welcome)
 app.use("/",blog)
 app.use("/get",getAll)
 app.use("/get",getAll)
 app.use("/delete",deleteBlog)
 app.use("/post",comment)
 app.use("/",updateBlog)
 app.use("/admin",admin)
 app.use("/",protectedRouter)








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

 connectMongodb();

const server=app.listen(port, () => {
    console.log("Our server is running on:", port);
    
})

export default server




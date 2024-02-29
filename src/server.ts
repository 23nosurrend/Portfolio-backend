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
import swaggerUi from "swagger-ui-express";
import swaggerOutput from './swagger_output.json';
import upload from "./midddleware/multer"
import { Request,Response } from "express"
dotenv.config();
const port = 3000;
const app = express();



app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
// create AP endpoint
 app.use("/welcome", welcome)
 app.use("/blog",blog /**#swagger.tags =["Blog"] */)
 app.use("/get",getAll /**#swagger.tags=["readBlog"] */)
 app.use("/get",getAll/**#swagger.tags=["readBlog"] */ )
 app.use("/delete",deleteBlog /**#swagger.tags=["deleteBlog"] */)
 app.use("/post",comment/**#swagger.tags=["comment-Blog"] */ )
 app.use("/update",updateBlog /**#swagger.tags=["Update-Blog"] */)
 app.use("/admin",admin /**#swagger.tags=["User"] */)
 app.use("/protect",protectedRouter /**#swagger.tags=["Auth"] */)
 app.get("/hey", (_req: Request, res: Response) => {
    res.send("Hello, World!");
  });
 // Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    // Handle the uploaded file
    res.json({ message: 'File uploaded successfully!' });
  });


  





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




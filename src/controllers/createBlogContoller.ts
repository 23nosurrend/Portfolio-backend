import Blogs from "../models/creatBlogModel"

const createBlog=async(req:any,res:any)=>{
    try{
        const {image,date,title,content}=req.body
        const newBlog=new Blogs({
            image,
            date,
            title,
            content

        })

    await newBlog.save()
    res.status(200).json({
        message:"Blogs created successfully"
    })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"Falied to create"
        })

    }

}

export default createBlog

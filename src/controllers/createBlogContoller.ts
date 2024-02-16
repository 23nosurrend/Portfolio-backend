import Blogs from "../models/creatBlogModel"

const createBlog=async(req:any,res:any)=>{
    try{
        const {image,date,title,content}=req.body
        // check if all reuqired field was provided
        if(!image||!date||!title||!content){
            return res.status(400).json({
                message:"Missing data"
            })
        }else{
            const existingBlog= await Blogs.findOne({title})
            if(existingBlog){
                return res.status(409).json({
                    message: `A blog with the title '${title}' already exists`
                })


            }
            const newBlog=new Blogs({
                image,
                date,
                title,
                content
    
            })
    
          await newBlog.save()
          return   res.status(200).json({
                 message:"Blogs created successfully"
                 })
        }
        

    }catch(err){
        console.log(err)

    return  res.status(500).json({
            message:"Failed  to create Blog"
            })

    }

}

export default createBlog

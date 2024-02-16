import Blogs from "../models/creatBlogModel"

const updateBlog=async(req:any,res:any)=>{

    try{
        const {title}:{title:string}=req.body
        const {newTitle,image,date,content}:{newTitle?:string,image?:string,date?:string,content?:string}=req.body
        const found=await Blogs.findOne({ title: title })
        if(!found){
            return res.status(400).json({
                message:"This blog  titled"+" "+title+" "+"does not exist"
            })
        }else{
            // check and see if new content is provided then replace
           if(newTitle) found.title=newTitle;
           if(image) found.image=image
           if(date) found.date=date
           if(content) found.content=content

           await found.save()
           return res.status(200).json({
            message:"Blog titled"+" "+title+" was succesful updated"
           })
        }

    }catch(err:any){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}


export default updateBlog
import Blogs from "../models/creatBlogModel"

const deleteAll=async(req:any,res:any)=>{
   try{
    const count:number=await Blogs.countDocuments()
     if(count===0){
        return res.status(404).json({
            message:"No current blogs to delete"
        })
     }else{
        await Blogs.deleteMany()
        return res.status(200).json({
            message:"All blogs deleted"
        })
     }


   }catch(err){
    console.log(err)
    return res.status(500).json({
        message:"Unable to delete Blogs"
    })
   }
}

const deleteOne=async(req:any,res:any)=>{
    try{
        const { title }: { title: string } = req.body;

        const found=await Blogs.findOne({title})
        if(!found){
            return res.status(400).json({
                message:"This blog entitled:"+" "+title+" "+"I is not found "
            })
        }else{
            await found.deleteOne()
            return res.status(200).json({
                message:"Blog  entitled"+" "+title+" "+"succesfully deleted"
            })


        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            message:"Can not delete this blog"
        })
    }
    

}

export {deleteAll,deleteOne}
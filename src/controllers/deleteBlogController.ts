import Blogs from "../models/creatBlogModel"

const deleteAll=async(req:any,res:any)=>{
   try{
    const count:number=await Blogs.countDocuments()
     if(count===0){
        return res.status(404).json({
            status:"fail",
            data:{
                 message:"No current blogs to delete"
            }
           
        })
     }else{
        await Blogs.deleteMany()
        return res.status(200).json({
            status:"success",
            data:{
                message:"All blogs deleted"
            }
            
        })
     }


   }catch(err){
    console.log(err)
    return res.status(500).json({
        status:"fail",
        data:{
            message:"Unable to delete Blogs"
        }
        
    })
   }
}

const deleteOne=async(req:any,res:any)=>{
    try{
        const { title }: { title: string } = req.body;

        const found=await Blogs.findOne({title})
        if(!found){
            return res.status(400).json({
                status:"fail",
                data:{
                    message:"This blog entitled:"+" "+title+" "+"I is not found "
                }
                
            })
        }else{
            await found.deleteOne()
            return res.status(200).json({
                status:"success",
                data:{
                     message:"Blog  entitled"+" "+title+" "+"succesfully deleted"
                }
               
            })


        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:"fail",
            data:{
                message:"Can not delete this blog"
            }
            
        })
    }
    

}

export {deleteAll,deleteOne}
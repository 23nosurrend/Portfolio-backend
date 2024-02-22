import Blogs from "../models/creatBlogModel"

const addComment=async(req:any,res:any)=>{
    try{
      
        const {title}:{title:string}=req.body
        const {name,text}:{name:string,text:string}=req.body
       
        // now let us access titled blog and add comments
        const found=await Blogs.findOne({title})
        if(!found){
            return res.status(400).json({
                status:"fail",
                data:{
                    message:"This blog entitled:"+" "+title+" "+"I is not found "
                }

                
            })
        }else{
             const commentArray=found.comment

             commentArray.push({name,text})
             await found.save()
            
            return res.status(200).json({
                status:"success",
                data:{
                     message:"Great!Mr/Ms you  comment saved succesfully!"
                }
               
            })


        }




        
    }catch(err){
        console.log(err)
        return res.status(500).json({
            status:"fail",
            data:{
                message:"Internal Server Error"
            }

            
        })
    }
    
}

export default addComment
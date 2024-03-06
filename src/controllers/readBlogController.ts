import Blogs from "../models/creatBlogModel"
const readAll=async (req:any,res:any)=>{
    try{
        const findAll=await Blogs.find()// find() is used to get all documenet
        if(!findAll.length){
            return res.status(400).json({
                status:"fail",
                data:{
                    message:"No Blogs available"
                }

                
            })
        }else{
            return res.status(200).json({
                status:"success",
                data:{
                     blogs:findAll
                }
               
            })
        }

    }catch(err:any){
        console.log(err)
        return res.status(400).json({
            status:"fail",
            data:{
                 message:"Failed to retrieve all Blogs"
            }
           
        })

    }
}

const readOne=async(req:any,res:any)=>{
    try{
        const {title}=req.params
        const FoundOne=await Blogs.findOne({title})
        if(!FoundOne){
            return res.status(400).json({
                status:"fail",
                data:{
                    message:"This Blogs currently isn't available"
                }
                
            })
        }else{
            return res.status(200).json({
                status:"success",
                data:{
                    message:FoundOne
                }
                
            })
        }






    }catch(err:any){
        console.log(err)
        return res.status(500).json({
            status:"success",
            data:{
                 message:"Unable to read Blog"
            }
           
        })

    }
}

export {readAll,readOne}
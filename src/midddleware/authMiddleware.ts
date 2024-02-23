import jwt from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"
import dotenv from "dotenv"


dotenv.config()
const secretKey='@@Key'

function authenticateToken(req:Request,res:Response,Next:NextFunction){
    const token=req.headers["authorization"]

    if(!token){
        return res.status(401).json({
            status:"fail",
            data:{
                message:"access denied access required"
            }
            
        })
    }else{
        const secret:string |undefined=process.env.secretKey 
        if(!secret){
            console.log("secret key not provided")
            process.exit()
        }
        jwt.verify(token,secret,(err:any,user:any)=>{
            if(err){
                console.log(secret,err)
                return res.status(403).json({
                    status:"fail",
                    data:{
                         error:"Invalid Token."
                    }
                   
                })
            }else{
                req.body.user=user;
                Next()
            }
        })
    }
}

export default authenticateToken
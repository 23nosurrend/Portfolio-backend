import jwt from "jsonwebtoken"
import {Request,Response,NextFunction} from "express"

const secretKey='@@Key'

function authenticateToken(req:Request,res:Response,Next:NextFunction){
    const token=req.headers["authorization"]

    if(!token){
        return res.status(401).json({
            message:"access denied access required"
        })
    }else{
        jwt.verify(token,secretKey,(err:any,user:any)=>{
            if(err){
                console.log(err)
                return res.status(403).json({
                    error:"Invalid Token."
                })
            }else{
                req.body.user=user;
                Next()
            }
        })
    }
}

export default authenticateToken
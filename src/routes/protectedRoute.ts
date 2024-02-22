import express from "express"
import authenticateToken from "../midddleware/authMiddleware"

const router=express.Router()

router.get("/",authenticateToken,(req,res)=>{
    return res.status(200).json({
        message:"Protected user accessed",user:req.body.user
    })
})

export default router
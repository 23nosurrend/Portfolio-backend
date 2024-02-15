import express from "express"
import welcome  from "../controllers/welcome"


const router=express.Router()

router.post("/",welcome )

export default router
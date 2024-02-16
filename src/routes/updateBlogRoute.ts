import express from "express"
import { Router } from "express"
import bodyparser from "body-parser"
import updateBlog from "../controllers/updateBlogController"

const router:Router=express.Router()

router.use(bodyparser.json())
router.put("/update",updateBlog)

export default router
import express from "express"
import Router from "express"
import bodyParser from "body-parser"
import createBlog from "../controllers/createBlogContoller"


const router=express.Router()
router.use(bodyParser.json())

router.post("/create",createBlog)
export default router
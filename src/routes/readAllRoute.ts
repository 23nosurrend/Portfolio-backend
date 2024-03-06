import express from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {readAll,readOne} from "../controllers/readBlogController"


const router:Router=express.Router()

router.use(bodyParser.json())
router.get("/blogs",readAll)
router.get("/blog/:title",readOne)

export default router



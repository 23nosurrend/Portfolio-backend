import express from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {readAll,readOne} from "../controllers/readBlogController"


const router:Router=express.Router()

router.use(bodyParser.json())
router.get("/all",readAll)
router.get("/one",readOne)

export default router



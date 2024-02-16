import express from "express"
import { Router } from "express"
import bodyparser from "body-parser"
import addComment from "../controllers/commentController"

const router:Router=express.Router()
router.use(bodyparser.json())
router.post("/comment",addComment)
export default router;
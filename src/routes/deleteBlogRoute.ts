import express  from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {deleteAll,deleteOne} from "../controllers/deleteBlogController"
import authenticateToken from "../midddleware/authMiddleware"

const router:Router=express.Router()
router.use(bodyParser.json())
router.delete("/blogs",authenticateToken,deleteAll)
router.delete("/blog",authenticateToken,deleteOne)
export default router
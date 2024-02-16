import express  from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {deleteAll,deleteOne} from "../controllers/deleteBlogController"

const router:Router=express.Router()
router.use(bodyParser.json())
router.delete("/all",deleteAll)
router.delete("/one",deleteOne)
export default router
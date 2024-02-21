import express  from "express"
import { Router } from "express"
import bodyParser from "body-parser"
import {SignUpController,loginController} from "../controllers/userController"

const router:Router=express.Router()
router.use(bodyParser.json())
router.post("/signUp",SignUpController)
router.post("/login",loginController)

export default router
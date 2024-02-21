import Users from "../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"





const secretKey="@@Key"// Secret key to be used in JWt

const SignUpController = async (req:any, res:any) => {
    try {
        const data = req.body


        if (data.length === 0) {
            return res.status(400).json({ message: "Empty data" });
        }
        const salt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(data.Password, salt);
        data.Password = hashedPassword

        const existinguser = await Users.findOne({ Email: data.Email })
        if (existinguser) {
           return  res.status(200).json({
                message: "email already in use"

            })

        }
        else {
            let userInfo = new Users({
                
                Email: data.Email,
                Username: data.Username,
                Password: data.Password
            });
           await userInfo.save();
           // generate JWT
           const token=jwt.sign({email:data.Email},secretKey,{expiresIn:"1h"})
          return res.status(200).json({
            message:"User created successfully",
            token:token
          })
           

    
        }

    }

    catch (err) {
        console.log("some error:", err)
        res.send("some error occured")
    }


}


const loginController=async(req:any,res:any)=>{
    try{ 
        const {Email,Password}=req.body
        // Check and see if pasword and email is provided
        if(!Email||!Password){
            return res.status(400).json({
                message:" Email and Password are required"
            })
        }else{
            const user=await Users.findOne({Email})
            if(!user){
                return res.status(400).json({
                    message:"The user doesn't exist"
                })
            }else{
                // check if passowrd exist ,this will prevent unexpected behavior when passowrd is not a string
                if(typeof user.Password !== "string"){
                    return res.status(400).json({
                        message:"invalid user credentials"
                    })
                }else{
                    const userPassword:boolean=await bcrypt.compare(Password,user.Password)
                    if(userPassword){
                        const token=jwt.sign({email:Email},secretKey,{expiresIn:"1h"})
                        return res.status(200).json({
                            message:"User created successfully",
                            token:token
                        })
                    }else{
                        return res.status(400).json({
                            message:"incorrect credentials"
                        })
                    }

                }
                
            }
        }

    }catch(err:any){
        console.log(err)
        return res.status(500).json({
            message:"Internal Server error"
        })

    }
   
}


export  {SignUpController,loginController}



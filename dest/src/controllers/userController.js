"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.SignUpController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SignUpController = async (req, res) => {
    try {
        const data = req.body;
        if (data.length === 0) {
            return res.status(400).json({
                status: "Fail",
                data: {
                    message: "Empty data"
                }
            });
        }
        const salt = await bcrypt_1.default.genSalt(8);
        const hashedPassword = await bcrypt_1.default.hash(data.Password, salt);
        data.Password = hashedPassword;
        const existinguser = await userModel_1.default.findOne({ Email: data.Email });
        if (existinguser) {
            return res.status(200).json({
                status: "Fail",
                data: {
                    message: "email already in use"
                }
            });
        }
        else {
            let userInfo = new userModel_1.default({
                Email: data.Email,
                Username: data.Username,
                Password: data.Password
            });
            await userInfo.save();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "User created successfully",
                }
            });
        }
    }
    catch (err) {
        console.log("some error:", err);
        return res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};
exports.SignUpController = SignUpController;
const loginController = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        // Check and see if pasword and email is provided
        if (!Email || !Password) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: " Email and Password are required"
                }
            });
        }
        else {
            const user = await userModel_1.default.findOne({ Email });
            if (!user) {
                return res.status(400).json({
                    status: "fail",
                    data: {
                        message: "The user doesn't exist"
                    }
                });
            }
            else {
                // check if passowrd exist ,this will prevent unexpected behavior when passowrd is not a string
                if (typeof user.Password !== "string") {
                    return res.status(400).json({
                        status: "fail",
                        data: {
                            message: "invalid user credentials"
                        }
                    });
                }
                else {
                    const userPassword = await bcrypt_1.default.compare(Password, user.Password);
                    if (userPassword) {
                        const secret = process.env.secretKey;
                        if (!secret) {
                            console.log("secret key not provided");
                            process.exit();
                        }
                        const token = jsonwebtoken_1.default.sign({ email: Email }, secret, { expiresIn: "1h" });
                        return res.status(200).json({
                            status: "success",
                            data: {
                                message: "Login successfully",
                                token: token
                            }
                        });
                    }
                    else {
                        return res.status(400).json({
                            status: "fail",
                            data: {
                                message: "incorrect credentials"
                            }
                        });
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "error",
            data: {
                message: "Internal Server error"
            }
        });
    }
};
exports.loginController = loginController;

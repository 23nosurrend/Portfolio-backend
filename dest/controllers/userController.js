"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.SignUpController = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "@@Key"; // Secret key to be used in JWt
const SignUpController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.length === 0) {
            return res.status(400).json({ message: "Empty data" });
        }
        const salt = yield bcrypt_1.default.genSalt(8);
        const hashedPassword = yield bcrypt_1.default.hash(data.Password, salt);
        data.Password = hashedPassword;
        const existinguser = yield userModel_1.default.findOne({ Email: data.Email });
        if (existinguser) {
            return res.status(200).json({
                message: "email already in use"
            });
        }
        else {
            let userInfo = new userModel_1.default({
                Email: data.Email,
                Username: data.Username,
                Password: data.Password
            });
            yield userInfo.save();
            // generate JWT
            const token = jsonwebtoken_1.default.sign({ email: data.Email }, secretKey, { expiresIn: "1h" });
            return res.status(200).json({
                message: "User created successfully",
                token: token
            });
        }
    }
    catch (err) {
        console.log("some error:", err);
        res.send("some error occured");
    }
});
exports.SignUpController = SignUpController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Email, Password } = req.body;
        // Check and see if pasword and email is provided
        if (!Email || !Password) {
            return res.status(400).json({
                message: " Email and Password are required"
            });
        }
        else {
            const user = yield userModel_1.default.findOne({ Email });
            if (!user) {
                return res.status(400).json({
                    message: "The user doesn't exist"
                });
            }
            else {
                // check if passowrd exist ,this will prevent unexpected behavior when passowrd is not a string
                if (typeof user.Password !== "string") {
                    return res.status(400).json({
                        message: "invalid user credentials"
                    });
                }
                else {
                    const userPassword = yield bcrypt_1.default.compare(Password, user.Password);
                    if (userPassword) {
                        const token = jsonwebtoken_1.default.sign({ email: Email }, secretKey, { expiresIn: "1h" });
                        return res.status(200).json({
                            message: "User created successfully",
                            token: token
                        });
                    }
                    else {
                        return res.status(400).json({
                            message: "incorrect credentials"
                        });
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server error"
        });
    }
});
exports.loginController = loginController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secretKey = '@@Key';
function authenticateToken(req, res, Next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            status: "fail",
            data: {
                message: "access denied access required"
            }
        });
    }
    else {
        const secret = process.env.secretKey;
        if (!secret) {
            console.log("secret key not provided");
            process.exit();
        }
        jsonwebtoken_1.default.verify(token, secret, (err, user) => {
            if (err) {
                console.log(secret, err);
                return res.status(403).json({
                    status: "fail",
                    data: {
                        error: "Invalid Token."
                    }
                });
            }
            else {
                req.body.user = user;
                Next();
            }
        });
    }
}
exports.default = authenticateToken;

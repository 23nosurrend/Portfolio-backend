"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = '@@Key';
function authenticateToken(req, res, Next) {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).json({
            message: "access denied access required"
        });
    }
    else {
        jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    error: "Invalid Token."
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const addComment = async (req, res) => {
    try {
        const { title } = req.body;
        const { name, text } = req.body;
        // now let us access titled blog and add comments
        const found = await creatBlogModel_1.default.findOne({ title });
        if (!found) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "This blog entitled:" + " " + title + " " + "I is not found "
                }
            });
        }
        else {
            const commentArray = found.comment;
            commentArray.push({ name, text });
            await found.save();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "Great!Mr/Ms you  comment saved succesfully!"
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "fail",
            data: {
                message: "Internal Server Error"
            }
        });
    }
};
exports.default = addComment;

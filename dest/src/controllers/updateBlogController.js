"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const updateBlog = async (req, res) => {
    try {
        const { title } = req.body;
        const { newTitle, image, date, content } = req.body;
        const found = await creatBlogModel_1.default.findOne({ title: title });
        if (!found) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "This blog  titled" + " " + title + " " + "does not exist"
                }
            });
        }
        else {
            // check and see if new content is provided then replace
            if (newTitle)
                found.title = newTitle;
            if (image)
                found.image = image;
            if (date)
                found.date = date;
            if (content)
                found.content = content;
            await found.save();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "Blog titled" + " " + title + " was succesful updated"
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
exports.default = updateBlog;

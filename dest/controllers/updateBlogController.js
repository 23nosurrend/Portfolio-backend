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
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const { newTitle, image, date, content } = req.body;
        const found = yield creatBlogModel_1.default.findOne({ title: title });
        if (!found) {
            return res.status(400).json({
                message: "This blog  titled" + " " + title + " " + "does not exist"
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
            yield found.save();
            return res.status(200).json({
                message: "Blog titled" + " " + title + " was succesful updated"
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
exports.default = updateBlog;

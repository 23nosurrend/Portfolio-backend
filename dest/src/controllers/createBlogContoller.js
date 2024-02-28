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
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, date, title, content } = req.body;
        // check if all reuqired field was provided
        if (!image || !date || !title || !content) {
            return res.status(400).json({
                message: "Missing data"
            });
        }
        else {
            const existingBlog = yield creatBlogModel_1.default.findOne({ title });
            if (existingBlog) {
                return res.status(409).json({
                    status: "fail",
                    data: {
                        message: `A blog with the title '${title}' already exists`
                    }
                });
            }
            const newBlog = new creatBlogModel_1.default({
                image,
                date,
                title,
                content
            });
            yield newBlog.save();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "Blogs created successfully"
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "fail",
            data: {
                message: "Failed  to create Blog"
            }
        });
    }
});
exports.default = createBlog;

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
        const newBlog = new creatBlogModel_1.default({
            image,
            date,
            title,
            content
        });
        yield newBlog.save();
        res.status(200).json({
            message: "Blogs created successfully"
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Falied to create"
        });
    }
});
exports.default = createBlog;

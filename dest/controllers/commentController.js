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
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const { name, text } = req.body;
        // now let us access titled blog and add comments
        const found = yield creatBlogModel_1.default.findOne({ title });
        if (!found) {
            return res.status(400).json({
                message: "This blog entitled:" + " " + title + " " + "I is not found "
            });
        }
        else {
            const commentArray = found.comment;
            commentArray.push({ name, text });
            yield found.save();
            return res.status(200).json({
                message: "Great!Mr/Ms you  comment saved succesfully!"
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
exports.default = addComment;

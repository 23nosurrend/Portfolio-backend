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
exports.deleteOne = exports.deleteAll = void 0;
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const deleteAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield creatBlogModel_1.default.countDocuments();
        if (count === 0) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "No current blogs to delete"
                }
            });
        }
        else {
            yield creatBlogModel_1.default.deleteMany();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "All blogs deleted"
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "fail",
            data: {
                message: "Unable to delete Blogs"
            }
        });
    }
});
exports.deleteAll = deleteAll;
const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const found = yield creatBlogModel_1.default.findOne({ title });
        if (!found) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "This blog entitled:" + " " + title + " " + "I is not found "
                }
            });
        }
        else {
            yield found.deleteOne();
            return res.status(200).json({
                status: "success",
                data: {
                    message: "Blog  entitled" + " " + title + " " + "succesfully deleted"
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "fail",
            data: {
                message: "Can not delete this blog"
            }
        });
    }
});
exports.deleteOne = deleteOne;

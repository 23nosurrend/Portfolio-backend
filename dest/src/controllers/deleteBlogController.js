"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.deleteAll = void 0;
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const deleteAll = async (req, res) => {
    try {
        const count = await creatBlogModel_1.default.countDocuments();
        if (count === 0) {
            return res.status(404).json({
                status: "fail",
                data: {
                    message: "No current blogs to delete"
                }
            });
        }
        else {
            await creatBlogModel_1.default.deleteMany();
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
};
exports.deleteAll = deleteAll;
const deleteOne = async (req, res) => {
    try {
        const { title } = req.body;
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
            await found.deleteOne();
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
};
exports.deleteOne = deleteOne;

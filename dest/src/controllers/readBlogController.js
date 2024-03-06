"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readOne = exports.readAll = void 0;
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const readAll = async (req, res) => {
    try {
        const findAll = await creatBlogModel_1.default.find(); // find() is used to get all documenet
        if (!findAll.length) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "No Blogs available"
                }
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                data: {
                    blogs: findAll
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({
            status: "fail",
            data: {
                message: "Failed to retrieve all Blogs"
            }
        });
    }
};
exports.readAll = readAll;
const readOne = async (req, res) => {
    try {
        const { title } = req.params;
        const FoundOne = await creatBlogModel_1.default.findOne({ title });
        if (!FoundOne) {
            return res.status(400).json({
                status: "fail",
                data: {
                    message: "This Blogs currently isn't available"
                }
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                data: {
                    message: FoundOne
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: "success",
            data: {
                message: "Unable to read Blog"
            }
        });
    }
};
exports.readOne = readOne;

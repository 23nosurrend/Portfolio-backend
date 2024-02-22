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
exports.readOne = exports.readAll = void 0;
const creatBlogModel_1 = __importDefault(require("../models/creatBlogModel"));
const readAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findAll = yield creatBlogModel_1.default.find(); // find() is used to get all documenet
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
});
exports.readAll = readAll;
const readOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const FoundOne = yield creatBlogModel_1.default.findOne({ title });
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
});
exports.readOne = readOne;

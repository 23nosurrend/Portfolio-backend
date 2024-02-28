"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const BlogSchema = new mongoose_1.default.Schema({
    image: {
        type: String
    },
    date: {
        type: String,
        required: "Date is required"
    },
    title: {
        type: String,
        required: "Title is required"
    },
    content: {
        type: String,
        required: "Content is required"
    },
    comment: {
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model("Blog", BlogSchema);

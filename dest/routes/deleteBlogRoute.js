"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const deleteBlogController_1 = require("../controllers/deleteBlogController");
const authMiddleware_1 = __importDefault(require("../midddleware/authMiddleware"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.delete("/blogs", authMiddleware_1.default, deleteBlogController_1.deleteAll);
router.delete("/blog", authMiddleware_1.default, deleteBlogController_1.deleteOne);
exports.default = router;

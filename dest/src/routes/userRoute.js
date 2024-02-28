"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.use(body_parser_1.default.json());
router.post("/signUp", userController_1.SignUpController);
router.post("/login", userController_1.loginController);
exports.default = router;

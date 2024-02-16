"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const welcomeRoutes_1 = __importDefault(require("./routes/welcomeRoutes"));
const createBlogRoute_1 = __importDefault(require("./routes/createBlogRoute"));
const readAllRoute_1 = __importDefault(require("./routes/readAllRoute"));
dotenv_1.default.config();
const port = 3000;
const app = (0, express_1.default)();
// create AP endpoint
app.use("/welcome", welcomeRoutes_1.default);
app.use("/write", createBlogRoute_1.default);
app.use("/get", readAllRoute_1.default);
app.use("/get/one", readAllRoute_1.default);
const connectMongodb = () => {
    const mongoPASS = process.env.MONGOPASS;
    if (!mongoPASS) {
        console.log("Can not read mongoo string");
        return;
    }
    else {
        mongoose_1.default.connect(mongoPASS)
            .then(() => {
            console.log("dataBase successfully connected");
        }).catch((err) => {
            console.log("dataBase failed to connect:", err);
        });
    }
};
app.listen(port, () => {
    console.log("Our server is running on:", port);
    connectMongodb();
});

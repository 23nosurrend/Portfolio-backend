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
const globals_1 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
(0, globals_1.beforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect("mongodb+srv://keynesbizimana:sic1INW614W0qyKr@my-blogs.fkwcung.mongodb.net/?retryWrites=true&w=majority");
}));
(0, globals_1.afterAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
    server_1.default.close();
}));
describe('readAll function', () => {
    it('should retrieve all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/get/blogs');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.blogs).toHaveLength(2);
    }));
});
describe('readAll function', () => {
    it('should retrieve all blogs', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default).get('/get/blogs');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.blogs).toHaveLength(2);
    }));
});
describe('commentBlog function', () => {
    it("should add comment on blog", () => __awaiter(void 0, void 0, void 0, function* () {
        const title = "Robots can peform better in Rwanda?";
        const name = "keynes";
        const text = "This is for testing purpose";
        const response = yield (0, supertest_1.default)(server_1.default)
            .post("/post/comment")
            .send({ title, name, text });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    }));
});
describe("update blog", () => {
    it("should update a blog", () => __awaiter(void 0, void 0, void 0, function* () {
        const title = "Robots can peform better in Rwanda?";
        const content = "New summary is based on teh statistics";
        const response = yield (0, supertest_1.default)(server_1.default)
            .put('/update/blog')
            .send({ title, content });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    }));
});

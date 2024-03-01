"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../src/server"));
(0, globals_1.beforeAll)(async () => {
    await mongoose_1.default.connect("mongodb+srv://keynesbizimana:sic1INW614W0qyKr@my-blogs.fkwcung.mongodb.net/?retryWrites=true&w=majority");
});
(0, globals_1.afterAll)(async () => {
    await mongoose_1.default.connection.close();
    server_1.default.close();
});
describe('readAll function', () => {
    it('should retrieve one blog', async () => {
        const title = "Robots can peform better in Rwanda?";
        const response = await (0, supertest_1.default)(server_1.default)
            .get('/get/blog')
            .send({ title });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.message).toBeDefined(); // Check if message data exists
        expect(response.body.data.message._id).toBeDefined();
    }), 15000;
});
describe('readAll function', () => {
    it('should retrieve all blogs', async () => {
        const response = await (0, supertest_1.default)(server_1.default).get('/get/blogs');
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.data.blogs).toHaveLength(4);
    });
});
describe('commentBlog function', () => {
    it("should add comment on blog", async () => {
        const title = "Robots can peform better in Rwanda?";
        const name = "keynes";
        const text = "This is for testing purpose";
        const response = await (0, supertest_1.default)(server_1.default)
            .post("/post/comment")
            .send({ title, name, text });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    });
});
describe("update blog", () => {
    it("should update a blog", async () => {
        const title = "Robots can peform better in Rwanda?";
        const content = "New summary is based on teh statistics";
        const response = await (0, supertest_1.default)(server_1.default)
            .put('/update/blog')
            .send({ title, content });
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("success");
    });
});

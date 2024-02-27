import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';
import mongoose from "mongoose";
import supertest from "supertest";
import server from "../src/server";
import dotenv from "dotenv";
beforeAll(async () => {
    await mongoose.connect( "mongodb+srv://keynesbizimana:sic1INW614W0qyKr@my-blogs.fkwcung.mongodb.net/?retryWrites=true&w=majority")
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });




describe('readAll function', () =>{
  it('should retrieve all blogs',async () => {
    const response= await supertest(server).get('/get/blogs'); 

    expect(response.status).toBe(200)
    expect(response.body.status).toBe('success')
    expect(response.body.data.blogs).toHaveLength(2); 
    
  })

});
describe('readAll function', () =>{
    it('should retrieve all blogs',async () => {
      const response= await supertest(server).get('/get/blogs'); 
  
      expect(response.status).toBe(200)
      expect(response.body.status).toBe('success')
      expect(response.body.data.blogs).toHaveLength(2); 
      
    })
  
  });
  describe('commentBlog function',()=>{
    it("should add comment on blog",async()=>{
        const title="Robots can peform better in Rwanda?"
        const name="keynes"
        const text="This is for testing purpose"
        const response=await supertest(server)
        .post("/post/comment")
        .send({title,name,text})
        
        expect(response.status).toBe(200)
        expect(response.body.status).toBe("success")
        
        
    })
  });
  describe("update blog",()=>{
    it("should update a blog",async()=>{ 
      const title="Robots can peform better in Rwanda?"
      const content="New summary is based on teh statistics"
      const response=await supertest(server)
      .put('/blog')
      .send({title,content})
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
    })
  
  })
  


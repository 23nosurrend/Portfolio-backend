import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  
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
        comment:{
            type:Array
        }
        
   
});

export default mongoose.model("Blog", BlogSchema);

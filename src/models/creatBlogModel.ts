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
        },
        likes:{
            type:Number,
            default:0
        }
        
   
});

export default mongoose.model("Blog", BlogSchema);

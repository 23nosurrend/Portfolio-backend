import Blogs from "../models/creatBlogModel";
import multer from "multer";

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage }).single('image'); // Assuming 'image' is the name of the file upload field

const createBlog = async (req: any, res: any) => {
    try {
        // Handle file upload
        upload(req, res, async (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    status: "fail",
                    data: {
                        message: "Failed to upload file"
                    }
                });
            }

            const { date, title, content } = req.body;

            // Check if all required fields were provided
            if (!req.file || !date || !title || !content) {
                return res.status(400).json({
                    message: "Missing data"
                });
            }

            // Check if blog with the same title already exists
            const existingBlog = await Blogs.findOne({ title });
            if (existingBlog) {
                return res.status(409).json({
                    status: "fail",
                    data: {
                        message: `A blog with the title '${title}' already exists`
                    }
                });
            }

            // Save new blog
            const newBlog = new Blogs({
                image: req.file.filename, // Use the filename provided by Multer
                date,
                title,
                content
            });

            await newBlog.save();

            return res.status(200).json({
                status: "success",
                data: {
                    message: "Blog created successfully"
                }
            });
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: "fail",
            data: {
                message: "Failed to create Blog"
            }
        });
    }
};

export default createBlog;

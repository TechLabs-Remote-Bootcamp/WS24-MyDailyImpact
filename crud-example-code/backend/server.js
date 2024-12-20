const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static("images"));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const Image = require('./models/Image');
const Comment = require('./models/Comment');

// Routes
app.get("/api/images", async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

app.get("/api/images/:id", async (req, res) => {
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
});

app.post("/api/images/:id/comments", async (req, res) => {
    console.log("Request body:", req.body);
    const image = await Image.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    const comment = new Comment({ comment: req.body.comment, image: req.params.id });
    if (!comment.comment) {
        return res.status(400).json({ error: "The `comment` field is required." });
    }
    try {
        const savedComment = await comment.save();
        console.log("Comment saved:", savedComment);
        res.status(201).json(savedComment);

    } catch (err) {
        console.error("Error saving comment:", err);
        return res.status(400).json({ error: err.message });
    }
    /* image.comments.push(savedComment._id);
    await image.save(); */
});

app.get("/api/images/:id/comments", async (req, res) => {
    const comments = await Comment.find({ image: req.params.id });
    res.json({ comments });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
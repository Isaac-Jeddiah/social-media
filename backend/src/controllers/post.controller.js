import Post from "../models/post.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const { content, image } = req.body;
    const userId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newPost = new Post({
      userId,
      content,
      image: imageUrl,
    });

    await newPost.save();
    await newPost.populate("userId", "fullName profilePic");

    res.status(201).json(newPost);
  } catch (error) {
    console.log("Error in createPost:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "fullName profilePic")
      .populate("comments.userId", "fullName profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getPosts:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.log("Error in likePost:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    post.comments.push({ userId, content });
    
    await post.save();
    await post.populate("comments.userId", "fullName profilePic");

    res.status(200).json(post.comments);
  } catch (error) {
    console.log("Error in addComment:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
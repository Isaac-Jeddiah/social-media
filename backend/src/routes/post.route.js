import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPost, getPosts, likePost, addComment } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createPost);
router.get("/", protectRoute, getPosts);
router.put("/like/:id", protectRoute, likePost);
router.post("/comment/:id", protectRoute, addComment);

export default router;
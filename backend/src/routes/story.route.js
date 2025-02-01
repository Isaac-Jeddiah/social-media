import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createStory, getStories } from "../controllers/story.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createStory);
router.get("/", protectRoute, getStories);

export default router;
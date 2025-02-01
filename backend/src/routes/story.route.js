import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createStory, getStories,deleteStory, viewStory } from "../controllers/story.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createStory);
router.get("/", protectRoute, getStories);
router.delete("/:id", protectRoute, deleteStory);
router.post("/:id/view", protectRoute, viewStory);
export default router;
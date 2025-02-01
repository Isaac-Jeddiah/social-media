import Story from "../models/story.model.js";

export const createStory = async (req, res) => {
  try {
    const { content, background, textColor, fontSize } = req.body;
    const userId = req.user._id;

    const newStory = new Story({
      userId,
      content,
      background,
      textColor,
      fontSize,
    });

    await newStory.save();
    await newStory.populate("userId", "fullName profilePic");

    res.status(201).json(newStory);
  } catch (error) {
    console.log("Error in createStory:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getStories = async (req, res) => {
  try {
    // Get stories from the last 24 hours
    const stories = await Story.find({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    })
      .populate("userId", "fullName profilePic")
      .sort({ createdAt: -1 });

    res.status(200).json(stories);
  } catch (error) {
    console.log("Error in getStories:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
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


export const deleteStory = async (req, res) => {
    try {
      const storyId = req.params.id;
      const userId = req.user._id;
  
      const story = await Story.findById(storyId);
      if (!story) return res.status(404).json({ error: "Story not found" });
      if (story.userId.toString() !== userId.toString()) {
        return res.status(403).json({ error: "Unauthorized" });
      }
  
      await story.deleteOne();
      res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
      console.log("Error in deleteStory:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const viewStory = async (req, res) => {
    try {
      const storyId = req.params.id;
      const userId = req.user._id;
  
      const story = await Story.findById(storyId);
      if (!story) return res.status(404).json({ error: "Story not found" });
  
      const alreadyViewed = story.viewers.includes(userId);
  
      if (!alreadyViewed) {
        story.viewers.push(userId);
        await story.save();
      }
  
      const viewCount = story.viewers.length;
      const populatedStory = await Story.findById(storyId)
        .populate("viewers", "fullName profilePic")
        .populate("userId", "fullName profilePic");
  
      res.status(200).json({ story: populatedStory, viewCount });
    } catch (error) {
      console.log("Error in viewStory:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  export const getStories = async (req, res) => {
    try {
      const stories = await Story.find({
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      })
        .populate("userId", "fullName profilePic")
        .populate("viewers", "fullName profilePic") 
        .populate("views.userId", "fullName profilePic")
        .sort({ createdAt: -1 });
  
      res.status(200).json(stories);
    } catch (error) {
      console.log("Error in getStories:", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
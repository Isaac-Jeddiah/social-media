import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useStoryStore = create((set, get) => ({
  stories: [],
  isLoading: false,

  createStory: async (data) => {
    try {
      const res = await axiosInstance.post("/stories/create", data);
      set({ stories: [res.data, ...get().stories] });
      toast.success("Story created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getStories: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/stories");
      set({ stories: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },


deleteStory: async (storyId) => {
    try {
      await axiosInstance.delete(`/stories/${storyId}`);
      set({ stories: get().stories.filter(story => story._id !== storyId) });
      toast.success("Story deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  viewStory: async (storyId) => {
    try {
      const res = await axiosInstance.post(`/stories/${storyId}/view`);
      const updatedStories = get().stories.map(story => 
        story._id === storyId ? res.data : story
      );
      set({ stories: updatedStories });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}));
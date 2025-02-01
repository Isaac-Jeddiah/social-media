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
}));
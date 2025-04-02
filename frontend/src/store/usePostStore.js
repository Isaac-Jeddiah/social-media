import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  createPost: async (data) => {
    try {
      const res = await axiosInstance.post("/posts/create", data);
      if (res.data) {
        set({ posts: [res.data, ...get().posts] });
        toast.success("Post created successfully");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error?.response?.data?.message || "Error creating post");
      throw error;
    }
  },
  getPosts: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/posts");
      set({ posts: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
  likePost: async (postId) => {
    try {
      const res = await axiosInstance.put(`/posts/like/${postId}`);
      const updatedPosts = get().posts.map((post) => {
        if (post._id === postId) {
          return { ...post, likes: res.data.likes };
        }
        return post;
      });
      set({ posts: updatedPosts });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  addComment: async (postId, content) => {
    try {
      const res = await axiosInstance.post(`/posts/comment/${postId}`, { content });
      const updatedPosts = get().posts.map((post) => {
        if (post._id === postId) {
          return { ...post, comments: res.data };
        }
        return post;
      });
      set({ posts: updatedPosts });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
}));
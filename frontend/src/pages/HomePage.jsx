import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { usePostStore } from "../store/usePostStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { Loader } from "lucide-react";

const HomePage = () => {
  const { selectedUser } = useChatStore();
  const { posts, getPosts, isLoading } = usePostStore();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="space-y-6">
          <CreatePost />
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import { useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import { Loader } from "lucide-react";
import StoriesBar from "../components/StoriesBar";

const HomePage = () => {
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
    
    
    <div className="min-h-screen bg-base-200 pt-20">
      <div className="fixed top-16 left-0 right-0 bg-base-200 z-30 px-4 py-2">
        <StoriesBar />
      </div>
      <div className="max-w-2xl mx-auto py-8 px-4">
        
          <div className="max-w-2xl mx-auto space-y-6" style={{ marginTop: "8rem" }}>
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
import { useState, useEffect } from "react";
import { usePostStore } from "../store/usePostStore";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import StoriesBar from "../components/StoriesBar";
import { Loader, ArrowUp } from "lucide-react";

const HomePage = () => {
  const { posts, getPosts, isLoading } = usePostStore();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    getPosts();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getPosts]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
    <div className="min-h-40">
      {/* Fixed Navbar Space */}
    

      {/* Fixed Stories Bar with backdrop blur */}
      <div className="fixed top-16 left-0 right-0 bg-base-200/80 backdrop-blur-lg z-30">
      <div className="container mx-auto px-4 py-4 border-b border-base-300/50">
        <StoriesBar />
      </div>
      </div>
   </div>
   
   
      <div className="min-h-screen bg-base-20">
      
      {/* Main Content with proper spacing */}
      <div className="container mx-auto px-4 pt-[88px]">
        <div className="max-w-2xl mx-auto space-y-6">
          <CreatePost />
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 btn btn-circle btn-primary backdrop-blur-lg bg-primary/80 shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
    </div>
  );
};

export default HomePage;
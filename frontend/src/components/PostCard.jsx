import { Heart, MessageCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { usePostStore } from "../store/usePostStore";
import { useState } from "react";
import toast from "react-hot-toast";

const PostCard = ({ post }) => {
  const [comment, setComment] = useState("");
  const { authUser } = useAuthStore();
  const { likePost, addComment } = usePostStore();

  const isLiked = post.likes.includes(authUser?._id);

  const handleLike = async () => {
    await likePost(post._id);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      await addComment(post._id, comment.trim());
      setComment("");
    } catch (error) {
      toast.error("Error adding comment");
    }
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-sm">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <img
          src={post.userId.profilePic || "/avatar.png"}
          alt={post.userId.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-medium">{post.userId.fullName}</h2>
          <p className="text-xs text-base-content/60">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 py-2">
        <p>{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full max-h-[500px] object-cover mt-2"
        />
      )}

      {/* Post Actions */}
      <div className="p-4 border-t border-base-200">
        <div className="flex items-center gap-4">
          <button
            className={`btn btn-ghost btn-sm gap-2 ${isLiked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart size={20} className={isLiked ? "fill-current" : ""} />
            {post.likes.length}
          </button>
          <button className="btn btn-ghost btn-sm gap-2">
            <MessageCircle size={20} />
            {post.comments.length}
          </button>
        </div>

        {/* Comments */}
        <div className="mt-4 space-y-4">
          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="input input-bordered input-sm flex-1"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Post
            </button>
          </form>

          <div className="space-y-3">
            {post.comments.map((comment, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <img
                  src={comment.userId.profilePic || "/avatar.png"}
                  alt={comment.userId.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-base-200 rounded-lg p-2">
                  <h3 className="text-sm font-medium">{comment.userId.fullName}</h3>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
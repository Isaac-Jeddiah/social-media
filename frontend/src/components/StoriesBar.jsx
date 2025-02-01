import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import CreateStory from "./CreateStory";

const StoriesBar = () => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const { authUser } = useAuthStore();
  const [stories, setStories] = useState([]); // We'll fetch stories here

  return (
    <>
      <div className="bg-base-100 p-4 rounded-xl shadow-sm mb-6">
        <div className="flex items-center gap-4 overflow-x-auto">
          {/* Create Story Button */}
          <button
            onClick={() => setShowCreateStory(true)}
            className="flex flex-col items-center gap-2 min-w-[80px]"
          >
            <div className="relative">
              <div className="w-[60px] h-[60px] rounded-full bg-base-200 flex items-center justify-center border-2 border-primary">
                <Plus className="w-6 h-6" />
              </div>
            </div>
            <span className="text-xs">Create Story</span>
          </button>

          {/* Stories List */}
          {stories.map((story) => (
            <button
              key={story._id}
              className="flex flex-col items-center gap-2 min-w-[80px]"
              onClick={() => handleViewStory(story)}
            >
              <div className="relative">
                <div className="w-[60px] h-[60px] rounded-full bg-base-200 border-2 border-primary overflow-hidden">
                  <img
                    src={story.userId.profilePic || "/avatar.png"}
                    alt={story.userId.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs truncate w-full text-center">
                {story.userId.fullName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Story Overlay */}
      {showCreateStory && (
        <div className="fixed inset-0 bg-base-300/80 z-50 flex items-center justify-center p-4">
          <div className="bg-base-100 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowCreateStory(false)}
              className="absolute -top-2 -right-2 btn btn-circle btn-sm"
            >
              <X className="w-4 h-4" />
            </button>
            <CreateStory onClose={() => setShowCreateStory(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default StoriesBar;
import { Plus, X, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useStoryStore } from "../store/useStoryStore";
import CreateStory from "./CreateStory";
import StoryView from "./StoryView";

const StoriesBar = () => {
  const [showCreateStory, setShowCreateStory] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const { authUser } = useAuthStore();
  const { stories, getStories, deleteStory } = useStoryStore();

  useEffect(() => {
    getStories();
  }, [getStories]);

  const myStories = stories.filter(story => story.userId._id === authUser._id);
  const otherStories = stories.filter(story => story.userId._id !== authUser._id);

  return (
    <>
      <div className="w-full bg-base-100 p-4 rounded-xl shadow-sm mb-6">
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

          {/* Divider */}
          {myStories.length > 0 && <div className="h-14 w-px bg-base-300" />}

          {/* My Stories */}
          {myStories.map((story) => (
            <button
              key={story._id}
              className="flex flex-col items-center gap-2 min-w-[80px]"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative">
                <div className="w-[60px] h-[60px] rounded-full bg-base-200 border-2 border-primary overflow-hidden">
                  <img
                    src={story.userId.profilePic || "/avatar.png"}
                    alt={story.userId.fullName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1 bg-black/50 rounded-full p-1">
                    <Eye className="w-4 h-4 text-white/75" />
                  </div>
                </div>
                <span className="absolute -bottom-6 text-xs text-center w-full">
                  {story.views.length} views
                </span>
              </div>
              <span className="text-xs mt-2">Your Story</span>
            </button>
          ))}

          {/* Divider */}
          {otherStories.length > 0 && <div className="h-14 w-px bg-base-300" />}

          {/* Other Stories */}
          {otherStories.map((story) => (
            <button
              key={story._id}
              className="flex flex-col items-center gap-2 min-w-[80px]"
              onClick={() => setSelectedStory(story)}
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

      {/* Story View Modal */}
      {selectedStory && (
        <StoryView
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onDelete={deleteStory}
          isOwnStory={selectedStory.userId._id === authUser._id}
        />
      )}

      {/* Create Story Modal */}
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
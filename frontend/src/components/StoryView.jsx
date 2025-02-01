import { useState, useEffect } from "react";
import { X, Trash2, Eye } from "lucide-react";
import { useStoryStore } from "../store/useStoryStore";

const StoryView = ({ story, onClose, onDelete, isOwnStory }) => {
  const { viewStory } = useStoryStore();
  const [showViewers, setShowViewers] = useState(false);

  useEffect(() => {
    if (!isOwnStory) {
      viewStory(story._id);
    }
  }, [story._id, isOwnStory, viewStory]);

  return (
    <div className="fixed inset-0 bg-base-300/80 z-50 flex items-center justify-center p-4">
      <div className="bg-base-100 rounded-xl w-full max-w-4xl h-[80vh] relative flex">
        {/* Story Content */}
        <div className="w-full lg:w-2/3 h-full">
          <div className={`h-full ${story.background} rounded-xl p-6 flex items-center justify-center relative`}>
            <p className={`text-center ${story.textColor} ${story.fontSize}`}>
              {story.content}
            </p>
            {isOwnStory && (
              <button 
                onClick={() => setShowViewers(!showViewers)}
                className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 rounded-full px-3 py-1 hover:bg-black/70"
              >
                <Eye className="w-4 h-4 text-white/75" />
                <span className="text-white/75 text-sm">{story.viewers?.length} views</span>
              </button>
            )}
          </div>
        </div>

        {/* Viewers List - Only visible for story owner */}
        {showViewers && isOwnStory && (
          <div className="fixed inset-x-0 bottom-0 bg-base-100 rounded-t-xl shadow-lg transition-transform duration-300 transform h-1/2">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Viewers</h3>
                <button 
                  onClick={() => setShowViewers(false)}
                  className="btn btn-ghost btn-sm btn-circle"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(50vh-8rem)]">
                {story.viewers?.map((viewer) => (
                  <div key={viewer._id} className="flex items-center gap-3 py-2">
                    <img
                      src={viewer.profilePic || "/avatar.png"}
                      alt={viewer.fullName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {console.log(viewer)}
                    <div className="font-medium">{viewer.fullName}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {isOwnStory && (
            <button
              onClick={() => {
                onDelete(story._id);
                onClose();
              }}
              className="btn btn-circle btn-sm btn-error"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="btn btn-circle btn-sm">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryView;
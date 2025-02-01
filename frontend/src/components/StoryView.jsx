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
                  <span className="text-white/75 text-sm">{story.views.length} views</span>
                </button>
              )}
            </div>
          </div>
  
          {/* Viewers List - Only visible for story owner */}
          {isOwnStory && showViewers && (
            <div className="hidden lg:block w-1/3 h-full border-l border-base-200 p-4">
              <h3 className="font-medium mb-4">Viewed by</h3>
              <div className="space-y-4 overflow-y-auto max-h-[calc(80vh-8rem)]">
                {story.views.map((view) => (
                  <div key={view._id} className="flex items-center gap-3">
                    <img
                      src={view.userId.profilePic || "/avatar.png"}
                      alt={view.userId.fullName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-sm">{view.userId.fullName}</div>
                      <div className="text-xs text-base-content/60">
                        {new Date(view.viewedAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
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
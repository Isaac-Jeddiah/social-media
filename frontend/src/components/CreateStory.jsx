import { useState } from "react";
import { useStoryStore } from "../store/useStoryStore";

const CreateStory = ({ onClose }) => {
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("bg-primary");
  const [textColor, setTextColor] = useState("text-white");
  const [fontSize, setFontSize] = useState("text-xl");
  const { createStory } = useStoryStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createStory({
        content: content.trim(),
        background,
        textColor,
        fontSize,
      });
      onClose();
    } catch (error) {
      console.error("Error creating story:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          className={`aspect-[9/16] ${background} rounded-xl p-6 flex items-center justify-center`}
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type your story..."
            className={`bg-transparent border-none outline-none resize-none w-full text-center ${textColor} ${fontSize}`}
            rows={4}
          />
        </div>

        {/* Style Controls */}
        <div className="flex gap-2 justify-center">
          <select
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="select select-sm"
          >
            <option value="bg-primary">Primary</option>
            <option value="bg-secondary">Secondary</option>
            <option value="bg-accent">Accent</option>
          </select>

          <select
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
            className="select select-sm"
          >
            <option value="text-white">White</option>
            <option value="text-black">Black</option>
          </select>

          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="select select-sm"
          >
            <option value="text-lg">Small</option>
            <option value="text-xl">Medium</option>
            <option value="text-2xl">Large</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Share Story
        </button>
      </form>
    </div>
  );
};

export default CreateStory;
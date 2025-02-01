import { useState, useRef } from "react";
import { Image, X } from "lucide-react";
import { usePostStore } from "../store/usePostStore";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { createPost } = usePostStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;
  
    try {
      const postData = {
        content: content.trim(),
        image: imagePreview
      };
      
      await createPost(postData);
      setContent("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error(error?.response?.data?.error || "Failed to create post");
    }
  };

  return (
    <div className="bg-base-100 rounded-xl p-4 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="textarea textarea-bordered w-full min-h-[120px]"
        />

        <div className="flex items-center justify-between">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-ghost btn-sm gap-2"
          >
            <Image size={20} />
            Add Image
          </button>

          <button 
            type="submit"
            className="btn btn-primary btn-sm"
            disabled={!content.trim() && !imagePreview}
          >
            Post
          </button>
        </div>

        {imagePreview && (
          <div className="relative w-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-h-[300px] object-cover rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 btn btn-circle btn-sm"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
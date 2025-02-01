import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      default: "bg-primary",
    },
    textColor: {
      type: String,
      default: "text-white",
    },
    fontSize: {
      type: String,
      default: "text-xl",
    },
  },
  { timestamps: true }
);

// Stories expire after 24 hours
storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const Story = mongoose.model("Story", storySchema);
export default Story;
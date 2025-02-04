import express from "express";
import dotenv from "dotenv";
const cors = require("cors");
import cookieParser from "cookie-parser";
import { server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import postRoutes from "./routes/post.route.js";
import storyRoutes from "./routes/story.route.js";
const app=express();
// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: 'https://kalakapu.vercel.app', // Allow requests from this origin
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);

// Connect to DB and start server
connectDB();

if (process.env.NODE_ENV !== 'production') {
  server.listen(5001, () => {
    console.log('Server running on port 5001');
  });
}


// ... (rest of the code remains the same)

// Export the Express.js app as a serverless function
export default app;
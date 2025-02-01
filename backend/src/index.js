// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";

// import path from "path";

// import { connectDB } from "./lib/db.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import postRoutes from "./routes/post.route.js";
// import { app, server } from "./lib/socket.js";
// import storyRoutes from "./routes/story.route.js";

// dotenv.config();
// console.log(process.env.mo)
// const PORT = process.env.PORT;
// const __dirname = path.resolve();
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ limit: '50mb', extended: true }));

// app.use(cors({
//   origin: process.env.FRONTEND_URL ,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));
// app.use(express.json());
// app.use(cookieParser());


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/stories", storyRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// if (PORT) {
//   server.listen(PORT, () => {
//     console.log(`Server running on PORT: ${PORT}`);
//     connectDB();
//   });
// } else {
//   // For Vercel deployment
//   connectDB();
// }
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import postRoutes from "./routes/post.route.js";
import storyRoutes from "./routes/story.route.js";

dotenv.config();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: [process.env.FRONTEND_URL,"https://kalakapu.vercel.app"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(cookieParser());

// Health check
// app.get("/api/health", (_, res) => {
//   res.status(200).json({ status: "ok" });
// });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/stories", storyRoutes);

// Connect to DB and start server
connectDB();

// For development
if (process.env.NODE_ENV !== 'production') {
  server.listen(5001, () => {
    console.log('Server running on port 5001');
  });
}

export default app;
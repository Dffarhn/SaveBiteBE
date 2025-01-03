import express, { json, urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import morgan from "morgan"; // Import morgan
import http from "http";  // Import http module to create the server
import { Server } from "socket.io";  // Import the Server class from socket.io
import router from "./src/router.js";
import errorHandler from "./src/execeptions/errorHandlerException.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001; // Fixed port assignment

// Create an HTTP server to handle both Express and Socket.IO
const server = http.createServer(app);

// Initialize Socket.IO with the server
export const io = new Server(server, {
  cors: {
    origin: "*", // Allow your client app's origin
    methods: ["GET", "POST"],
  }
});

let userSockets = {};  // Store userId to socket mapping

// Middleware
app.use(cors({
  origin: "*", // Allow your client app's origin
}));
app.use(morgan(':method :url :status :response-time ms - :res[content-length]')); // Custom morgan format
app.use(compression());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Selamat datang di aplikasi Express.js!");
});

app.use("/api/v1", router);
app.use(errorHandler);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle when the user joins with their userId
  socket.on("register", (userId) => {
    console.log(`User ${userId} connected with socket ${socket.id}`);
    userSockets[userId] = socket.id;  // Map userId to socket.id
  });

  // Listen for when a user disconnects
  socket.on("disconnect", () => {
    for (let userId in userSockets) {
      if (userSockets[userId] === socket.id) {
        delete userSockets[userId];
        console.log(`User ${userId} disconnected`);
        break;
      }
    }
  });
});

// Function to send a notification to a specific user by their userId
export function sendNotificationToUser(userId,title, message) {
  const userSocketId = userSockets[userId];
  if (userSocketId) {
    io.to(userSocketId).emit("notification", {title,message});  // Send message to specific user
  } else {
    console.log(`User ${userId} not connected`);
  }
}

// Start the HTTP server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

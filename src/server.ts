import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import actionRoutes from "./routes/action.routes";
import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";
import connectDB from "./db/connect";
import axios from "axios";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { Application, json, urlencoded } from "express";
dotenv.config();

// Initialize the Express application
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in the environment variables");
}

// Middleware
app.use(morgan("combined"));
app.use(cors());
app.use(json());
app.use(helmet());
app.use(urlencoded());

// Routes
app.use("/api/v1/event-blink", actionRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", eventRoutes);

const serverUrl = "https://eventmint.onrender.com";
const checkServerHealth = () => {
  axios
    .get(serverUrl)
    .then((response) => {
      console.log(`Server is healthy`, response.data);
    })
    .catch((error) => {
      console.error(`Error checking server health:`, error.message);
    });
};

const interval: number = 2 * 60 * 1000;
setInterval(checkServerHealth, interval);

// Catch-all route
app.get("*", (req, res) => {
  res.json("HELLO CHINEMEREM");
});

const start = async () => {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Error starting the server:", error);
  }
};

start();

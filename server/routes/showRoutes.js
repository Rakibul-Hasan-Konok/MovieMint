import express from "express";
import {
  getNowPlayingMovies,
  addShow,
  getShows,
  getShow,
} from "../controllers/showController.js";
import { protectAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public route
router.get("/now-playing", getNowPlayingMovies);

// Admin-only routes
router.post("/add", protectAdmin, addShow);
router.get("/shows", protectAdmin, getShows);
router.get("/all",getShows); // alias route for /all
router.get("/:movieId", getShow);

export default router;

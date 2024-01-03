import express from "express";
import { getNotes , createNotes } from "../controllers/notes.js";

const router = express.Router();

// All routes here are starting with /api
router.get('/notes' , getNotes);
router.post('/notes' ,createNotes );

export default router;

import express from "express";
import { getNotes , createNotes ,updateNotes ,deleteNotes ,getNotesById  ,getSearchNotes} from "../controllers/notes.js";

const router = express.Router();

// All routes here are starting with /api
router.get('/notes' , getNotes);
router.get('/notes/:id' , getNotesById)
router.get('/search', getSearchNotes)
router.post('/notes' ,createNotes );
router.put('/notes/:id', updateNotes);
router.delete('/notes/:id' , deleteNotes);

export default router;
 
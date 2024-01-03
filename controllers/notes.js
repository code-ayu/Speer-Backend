import notesDetails from "../models/notesDetails.js"

export const getNotes =  async (req ,res) => {
    try {
        const notes = await notesDetails.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({message :error.message})
        console.log(error)
    }
}

export const createNotes =async (req, res) => {
    const notesBody = req.body;
    const newNote = new notesDetails(notesBody)
    try {
        await newNote.save();
        res.status(201).json(newNote)
    } catch (error) {
        res.status(409).json({message : error.message})
    }
}
import notesDetails from '../models/notesDetails.js'
import mongoose  from "mongoose";

export const getNotes =  async (req ,res) => {
    try {
        const notes = await notesDetails.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(404).json({message :error.message})
        console.log(error)
    }
}

export const getNotesById = async (req, res) => {
    try {
        const { id: _id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No note with that id');
        }

        const note = await notesDetails.findById(_id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.json(note);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


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

export const updateNotes = async (req, res) => {
    try {
        const { id: _id } = req.params;
        const note = req.body;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).send('No note with that id');
        }
        const updateNote = await notesDetails.findByIdAndUpdate(_id, note, { new: true });
        if (!updateNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json(updateNote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const deleteNotes = async (req, res) => {
    const { id: idRemove } = req.params;
    if (!mongoose.Types.ObjectId.isValid(idRemove)) {
        return res.status(404).send('No note with that id');
    }
    try {
        const deletedNote = await notesDetails.findOneAndDelete({ _id: idRemove });
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getSearchNotes = async (req, res) => {
    try {
        const { notes, writtenBy } = req.query;
        const queryObject = {};

        if (notes) {
            queryObject.notes = notes;
        }
        if (writtenBy) {
            queryObject.writtenBy = writtenBy;
        }

        const myData = await notesDetails.find(queryObject);
        res.status(200).json(myData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

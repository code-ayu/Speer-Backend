import mongoose from "mongoose";

const notesSchema = mongoose.Schema({

    subject : String,
    semester : Number,
    notes : String,
    writtenBy : {
        type: String, 
        default : 'Unknown'
    },
    submittedAt : {
        type : Date,
        default : new Date()
    }
});

notesSchema.index({ notes: 'text' });

const notesDetails = mongoose.model('notesDetails' , notesSchema);
export default notesDetails;

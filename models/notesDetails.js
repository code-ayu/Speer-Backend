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

const notesDetails = mongoose.model('notesDetails' , notesSchema);
export default notesDetails;

import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';

import notesRoutes from './routes/notes.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json({limit : "30mb" , extended : true}));
app.use(cors());

app.use('/api', notesRoutes);

const CONNECTION_URL = 'mongodb+srv://ayushmehrotra525:Ayush1234@speerbackend.ss1er3y.mongodb.net/'
mongoose.connect(CONNECTION_URL ,{useNewUrlParser: true , useUnifiedTopology : true})
    .then(()=>app.listen(PORT , () => console.log(`Server running on post : http://localhost:${PORT}`)))
    .catch((error)=> console.log(error.message));





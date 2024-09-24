import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(
        () => { console.log('Base de datos conectada') }
    ).catch(err => {
        console.log(err)
    });


const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
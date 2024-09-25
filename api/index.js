import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(
        () => { console.log('Base de datos conectada') }
    ).catch(err => {
        console.log(err)
    });


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

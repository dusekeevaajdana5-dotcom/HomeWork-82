import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
})
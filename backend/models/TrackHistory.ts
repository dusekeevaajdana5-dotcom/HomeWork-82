import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackHistorySchema = new mongoose.Schema({
    user : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // track:
    datetime: Date,
});

const TrackHistory = mongoose.model("TrackHistory", TrackHistorySchema);
export default TrackHistory;
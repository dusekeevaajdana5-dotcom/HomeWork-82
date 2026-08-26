import express from "express";
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";


const trackHistoryRouter  = express.Router();


trackHistoryRouter.post ('/track_history', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'Unauthorized'});
    }

    res.send("Success!");

    const { track } = req.body;

    if (!track) {
        return res.status(400).send({ error: 'Track ID is required' });
    }

    try {

        const trackHistory = new TrackHistory({
            user: user._id,
            track: track,
            datetime: new Date()
        });

        await trackHistory.save();

        return res.send(trackHistory);
    } catch (error) {
        return res.status(500).send({ error: 'Server error' });
    }

});

export default trackHistoryRouter;


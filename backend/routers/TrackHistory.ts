import express from "express";
import User from "../models/User";


const trackHistoryRouter  = express.Router();



trackHistoryRouter.post ('/secret', async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).send({error: 'No token present'});
    }

    const user = await User.findOne({token});
    if (!user) {
        return res.status(401).send({error: 'Wrong token'});
    }

    res.send("Success!")
})

export default trackHistoryRouter;


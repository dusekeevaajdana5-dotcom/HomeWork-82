import express from "express";
import Artist from "../models/Artist";


const artistRouter = express.Router();


artistRouter.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch {
        res.sendStatus(500);
    }
});

artistRouter.post("/", async (req, res) => {
    const artistData = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
    }

    const artist = new Artist(artistData);


    try {
      await artist.save();
      res.send(artist);
    }
    catch {

  }
});

export default artistRouter;
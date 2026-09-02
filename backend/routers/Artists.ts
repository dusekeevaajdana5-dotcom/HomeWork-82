import express from "express";
import Artist from "../models/Artist";
import auth from "../middlewares/auth";


const artistRouter = express.Router();


artistRouter.get("/", async (req, res) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (error) {
        res.status(500).send({ message: "Ошибка сервера", error });
    }
});

artistRouter.post("/", auth, async (req, res) => {
    const artistData = {
        name: req.body.name,
        image: req.body.image,
        date: req.body.date,
    }

    const artist = new Artist(artistData);


    try {
      await artist.save();
      res.send(artist);
    }
    catch (e) {
        if (e instanceof Error) {
         return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
  }
});

export default artistRouter;
import express from "express";
import Album from "../models/Album";

const albumRouter = express.Router();

albumRouter.get("/", async (req, res) => {
    try {
        const albums = await Album.find();
        res.send(albums);
    } catch {
        res.sendStatus(500);
    }
});

albumRouter.get("/:id", async (req, res) => {
    try {
        const album = await Album.findById(req.params.id).populate("artist", "name");

        if (!album) {
            return res.sendStatus(404);
        }

        res.send(album);
    } catch (error) {
        res.sendStatus(500);
    }
});

albumRouter.post("/", async (req, res) => {
    const albumData = {
        name: req.body.name,
        artist: req.body.artist,
        year: req.body.year,
        image: req.body.image
    }

    const album = new Album(albumData);

    try {
        await album.save();
        res.send(album);
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
});

export default albumRouter;
import express from "express";
import Album from "../models/Album";
import { imagesUpload } from "../multer";


const albumRouter = express.Router();

albumRouter.get("/", async (req, res) => {
    try {
        const { artist } = req.query;

        if (artist) {
            const albums = await Album.find({ artist: artist as string });
            return res.send(albums);
        }


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

albumRouter.post("/", imagesUpload.single('image'), async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({error: "Error"});
        }

        const albumData = {
            name: req.body.name,
            artist: req.body.artist,
            year: Number(req.body.year),
            image: req.file ? req.file.filename : null
        };

        const album = new Album(albumData);

        await album.save();
        res.status(201).send(album);
    }
    catch (e) {
        if (e instanceof Error) {
            return res.status(400).send({error: e.message});
        }
        res.sendStatus(500);
    }
});


export default albumRouter;
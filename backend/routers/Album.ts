import express from "express";
import Album from "../models/Album";
import { imagesUpload } from "../multer";
import auth, {RequestWithUser} from "../middlewares/auth";


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

albumRouter.post("/", auth, imagesUpload.single('image'), async (req, res) => {
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

albumRouter.delete("/:id", auth, imagesUpload.single('image'), async (req, res) => {
    try {
        const reqWithUser = req as  RequestWithUser;
        const user = reqWithUser.user;


        if (user.role !== "administrator") {
            res.status(403).send({ error: "You cannot delete the album" });
            return;
        }


        const deletedAlbum = await Album.findByIdAndDelete(reqWithUser.params.id);

        if (!deletedAlbum) {
            res.status(404).send({ error: "Album not found" });
            return;
        }

        res.send({ message: "Successfully deleted" });
    } catch (e) {
        res.status(500).send({ error: "Ошибка сервера" });
    }
});

albumRouter.patch("/:id/togglePublished", auth,  async (req, res) => {
    try {
        const reqWithUser = req as  RequestWithUser;

        const user = reqWithUser.user;

         if (user.role !== "administrator") {
          return res.status(403).send({ error: "You cannot publish the album" });
         }

         const album = await Album.findById(reqWithUser.params.id);

         if (!album) {
             return res.status(404).send({ error: "Album not found" });
         }

         album.isPublished = !album.isPublished;
         await album.save();
         res.send({ message: "Successfully published", album});


    }  catch (e) {
        res.status(500).send({ error: "Ошибка сервера" });
    }
});


export default albumRouter;
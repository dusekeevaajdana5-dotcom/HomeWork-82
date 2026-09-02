import express, { Request, Response } from "express";
import Artist from "../models/Artist";
import auth, { RequestWithUser } from "../middlewares/auth";


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


artistRouter.delete("/:id", auth, async (req: Request, res: Response) => {
    try {

        const reqWithUser = req as  RequestWithUser;
        const user = reqWithUser.user;


        if (user.role !== "administrator") {
            res.status(403).send({ error: "You cannot delete the artist" });
            return;
        }


        const deletedArtist = await Artist.findByIdAndDelete(reqWithUser.params.id);

        if (!deletedArtist) {
            res.status(404).send({ error: "Artist not found" });
            return;
        }

        res.send({ message: "Successfully deleted" });
    } catch (e) {
        res.status(500).send({ error: "Ошибка сервера" });
    }
});

artistRouter.patch("/:id/togglePublished", auth, async (req: Request, res: Response) => {
    try {
        const reqWithUser = req as  RequestWithUser;

        const user = reqWithUser.user;

        if (user.role !== "administrator") {
           return  res.status(403).send({ error: "You cannot publish the artist" });
        }

        const artist = await Artist.findById(reqWithUser.params.id);

        if (!artist) {
         return  res.status(404).send({ error: "Artist not found" });
        }

         artist.isPublished = !artist.isPublished;

        await artist.save();

        res.send({ message: "Successfully updated", artist });



    } catch (e) {
        res.status(500).send({ error: "Ошибка сервера" });
    }
})


export default artistRouter;
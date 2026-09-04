import {Router} from "express";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middlewares/auth";


const trackRouter = Router();



trackRouter.get('/', async (req, res) => {
    try {

        const query: any = {};

        const albumId = req.query.album || req.query.album_id;

        if (albumId) {
            query.album = albumId;
        }


        const tracks = await Track.find(query).sort({ number: 1 });

        res.send(tracks);

    } catch (e) {
        res.sendStatus(500);
    }
});



trackRouter.post('/', auth, async (req, res) => {
    const trackData = {
        name: req.body.name,
        album: req.body.album,
        duration: req.body.duration,
    }

    const track = new Track(trackData);

    try {
        await track.save();
        res.send(track);

    } catch (e) {
            if (e instanceof Error) {
                return res.status(400).send({error: e.message});
            }
            res.sendStatus(500);
    }
});

trackRouter.delete('/:id', auth, async (req, res) => {
  try {
      const reqWithUser = req as  RequestWithUser;
      const user = reqWithUser.user;

      if (user.role !== "administrator"){
          return res.status(403).send({error: "You cannot delete the track"});
      }

      const deleteTrack = await Track.findByIdAndDelete(reqWithUser.params.id);

      if (!deleteTrack) {
          return res.status(403).send({error: "Track not found"});
      }

      res.send({ message: "Successfully deleted" });

  } catch (e) {
      res.status(500).send({ error: "Ошибка сервера" });
  }
});


trackRouter.patch("/:id/togglePublished", auth, async (req, res) => {
    try {
        const reqWithUser = req as  RequestWithUser;

        const user = reqWithUser.user;

        if (user.role !== "administrator"){
            return res.status(403).send({error: "You cannot publish the track"});
        }

        const track = await Track.findById(reqWithUser.params.id);

        if (!track) {
            return res.status(404).send({error: "Track not found"});
        }

        track.isPublished = !track.isPublished;

        await track.save();

        res.send({ message: "Successfully published", track });

    }  catch (e) {
        res.status(500).send({ error: "Ошибка сервера" });
    }
});

export default trackRouter;
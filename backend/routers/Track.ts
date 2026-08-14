import {Router} from "express";
import Track from "../models/Track";


const trackRouter = Router();



trackRouter.get('/', async (req, res) => {
     try {
         const {album_id} = req.query;

         if (album_id) {
             const track = await Track.findById({album: req.query.album as string});
         }

         const  track = await Track.find();
         res.send(track);

     } catch {
         res.sendStatus(500);
     }
});


trackRouter.post('/', async (req, res) => {
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

export default trackRouter;
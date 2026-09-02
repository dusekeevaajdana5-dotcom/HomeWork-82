import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import artistRouter from "./routers/Artists";
import albumRouter from "./routers/Album";
import trackRouter from "./routers/Track";
import usersRouter from "./routers/User";
import trackHistoryRouter from "./routers/TrackHistory";

const app = express();
const port = 8088;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/artists", artistRouter);
app.use("/albums", albumRouter);
app.use("/tracks", trackRouter);
app.use("/users", usersRouter);
app.use("/trackHistories", trackHistoryRouter);




const run = async () => {
    await mongoose.connect(config.mongoDbUrl);

    app.listen (port, () => {
        console.log("Listening on port " + port);
    });

    process.on ("exit", () => {
        mongoose.disconnect();
    });


}

run().catch(e => console.error(e));



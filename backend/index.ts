import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import artistRouter from "./routers/Artists";
import albumRouter from "./routers/Album";
import trackRouter from "./routers/Track";
import usersRouter from "./routers/User";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/artists", artistRouter);
app.use("/album", albumRouter);
app.use("/track", trackRouter);
app.use("/users", usersRouter);




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



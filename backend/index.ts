import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import artistRouter from "./routers/Artists";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/artists", artistRouter);



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



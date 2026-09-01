import mongoose from "mongoose";
import crypto from "crypto";
import config from "./config";
import User from "./models/User";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.mongoDbUrl);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("albums");
        await db.dropCollection("artists");
        await db.dropCollection("tracks");
        await db.dropCollection("trackHistories");

    } catch (e) {
        console.log('Collection were not present, skipping drop...');
    }

    try {

        await User.create([
            {
                username: "Admin",
                password: "1234",
                token: crypto.randomUUID(),
                role: "administrator",
            },
            {
                username: "User",
                password: "1234",
                token: crypto.randomUUID(),
                role: "user",
            }
        ]);


        const justin = await Artist.create({
            name: "Justin Timberlake",
            image: null,
            date: "1981"
        });

        const theWeeknd = await Artist.create({
            name: "The Weeknd",
            image: null,
            date: "1990"
        });


        const [futureSexAlbum, experienceAlbum] = await Album.create([
            {
                name: "FutureSex/LoveSounds",
                artist: justin._id,
                year: 2006,
                image: null
            },
            {
                name: "The 20/20 Experience",
                artist: justin._id,
                year: 2013,
                image: null
            }
        ]);


        const [afterHoursAlbum] = await Album.create([
            {
                name: "After Hours",
                artist: theWeeknd._id,
                year: 2020,
                image: null
            }
        ]);


        await Track.create([
            {
                name: "SexyBack",
                album: futureSexAlbum._id,
                duration: 242,
                number: 1
            },
            {
                name: "Mirrors",
                album: experienceAlbum._id,
                duration: 485,
                number: 1
            }
        ]);


        await Track.create([
            {
                name: "Blinding Lights",
                album: afterHoursAlbum._id,
                duration: 200,
                number: 1
            },
            {
                name: "Save Your Tears",
                album: afterHoursAlbum._id,
                duration: 215,
                number: 2
            }
        ]);

        console.log('Database successfully seeded with Justin Timberlake and The Weeknd!');

    } catch (error) {
        console.error('Ошибка сидинга:', error);
    } finally {
        await mongoose.disconnect();
    }
};

run().catch(console.error);

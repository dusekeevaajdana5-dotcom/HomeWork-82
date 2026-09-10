import path from "path";

const rootPath = __dirname;

const config = {
    rootPath: rootPath,
    publicPath: path.join(rootPath, "public"),
    mongoDbUrl: 'mongodb://127.0.0.1:27017/music_app',
    googleClientId: process.env.GOOGLE_CLIENT_ID,
};

export default config;
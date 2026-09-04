import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {ArtistMutation} from "../../interfaces.ts";



export const register = createAsyncThunk(
    "artists/fetchAll",
    async () => {
        const { data } = await axiosApi.get("/artists");
        return data;
    }
)

export const createArtist = createAsyncThunk<void, ArtistMutation>(
    "artists/create",
    async (artist) => {
        const newArtist = {
            ...artist,
            date: Number(artist.date)
        }
        await axiosApi.post("/artists", newArtist);
    }

)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import type { Tracks } from "../../interfaces";

export const getTracks = createAsyncThunk<Tracks[], string | undefined>(
    'tracks/fetchTracks',
    async (albumId) => {
        const url = albumId ? `/track?album=${albumId}` : '/track';
        const { data } = await axiosApi.get<Tracks[]>(url);
        return data;
    }
);

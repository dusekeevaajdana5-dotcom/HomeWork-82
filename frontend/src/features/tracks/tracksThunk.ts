import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import type { Tracks } from "../../interfaces";

export const getTracks = createAsyncThunk<Tracks[], string | undefined>(
    'tracks/fetchTracks',
    async (albumId, { rejectWithValue }) => {
        try {
            const url = albumId ? `/tracks?album=${albumId}` : '/tracks';
            const { data } = await axiosApi.get<Tracks[]>(url);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Что-то пошло не так');
        }
    }
);

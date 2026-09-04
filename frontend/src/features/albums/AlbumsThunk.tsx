import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Album} from "../../interfaces.ts";

export const albumGet = createAsyncThunk<Album[], string | undefined>(

    'albums/fetchAlbums',
    async() => {
        const { data } = await axiosApi.get<Album[]>("/albums");
        return data
    }
);
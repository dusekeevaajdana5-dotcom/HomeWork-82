import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Album} from "../../interfaces.ts";

export const albumGet = createAsyncThunk<Album[]>(
    'albums/fetchAlbums',
    async() => {
        const { data } = await axiosApi.get<Album[]>("/album");
        return data
    }
);
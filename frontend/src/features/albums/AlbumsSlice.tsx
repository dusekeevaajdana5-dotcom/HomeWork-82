import type {Album} from "../../interfaces.ts";
import {createSlice} from "@reduxjs/toolkit";
import {albumGet} from "./AlbumsThunk";


interface State {
    albums: Album[];
    albumsLoading: boolean;
}

const initialState: State = {
    albums: [],
    albumsLoading: false,
};

const albumSlice = createSlice({
    name:"albums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(albumGet.pending, (state) => {
                state.albumsLoading = true;
            })
            .addCase(albumGet.fulfilled, (state, { payload }) => {
                state.albumsLoading = false;
                state.albums = payload;
            })
            .addCase(albumGet.rejected, (state) => {
                state.albumsLoading = false;
            });
    },
    selectors: {
        selectAlbums: (state: State) => state.albums,
        selectAlbumLoading:(state: State) => state.albumsLoading
    },
})

export const albumReducer = albumSlice.reducer;
export const {selectAlbums, selectAlbumLoading } =  albumSlice.selectors;

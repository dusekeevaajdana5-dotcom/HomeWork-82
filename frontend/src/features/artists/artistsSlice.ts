import type { ArtistMutation } from "../../interfaces.ts";
import { createSlice } from "@reduxjs/toolkit";
import {createArtist, register} from "./artistsThunk.ts";

interface State {
    artists: ArtistMutation[];
    artistsLoading: boolean;
    createLoading: boolean;
}

const initialState: State = {
    artists: [],
    artistsLoading: false,
    createLoading: false,
};

const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.artistsLoading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.artistsLoading = false;
                state.artists = payload as ArtistMutation[];
            })
            .addCase(register.rejected, (state) => {
                state.artistsLoading = false;
            });
        builder
            .addCase(createArtist.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createArtist.fulfilled, (state) => {
                state.createLoading = false;

            })
            .addCase(createArtist.rejected, (state) => {
                state.createLoading = false;
            });
    },
    selectors: {
        selectArtists: (state: State) => state.artists,
        selectArtistsLoading : (state: State) => state.artistsLoading,
        createLoading: (state: State) => state.createLoading
    },
});

export const artistsReducer = artistSlice.reducer;
export const { selectArtists, selectArtistsLoading, createLoading } = artistSlice.selectors;


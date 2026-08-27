import type { ArtistMutation } from "../../interfaces.ts";
import { createSlice } from "@reduxjs/toolkit";
import { register } from "./artistsThunk.ts";

interface State {
    artists: ArtistMutation[];
    artistsLoading: boolean;
}

const initialState: State = {
    artists: [],
    artistsLoading: false,
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
    },
    selectors: {
        selectArtists: (state: State) => state.artists,
        selectArtistsLoading : (state: State) => state.artistsLoading,
    },
});

export const artistsReducer = artistSlice.reducer;
export const { selectArtists, selectArtistsLoading } = artistSlice.selectors;


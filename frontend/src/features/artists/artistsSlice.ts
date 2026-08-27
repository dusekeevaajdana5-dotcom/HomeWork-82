import type { ArtistMutation } from "../../interfaces.ts";
import { createSlice } from "@reduxjs/toolkit";
import { register } from "./artistsThunk.ts";

interface State {
    artists: ArtistMutation[];
    registerLoading: boolean;
}

const initialState: State = {
    artists: [],
    registerLoading: false,
};

const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.registerLoading = true;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.registerLoading = false;
                state.artists = payload as ArtistMutation[];
            })
            .addCase(register.rejected, (state) => {
                state.registerLoading = false;
            });
    },
    selectors: {
        selectArtists: (state: State) => state.artists,
        selectRegisterLoading: (state: State) => state.registerLoading,
    },
});

export const artistsReducer = artistSlice.reducer;
export const { selectArtists, selectRegisterLoading } = artistSlice.selectors;


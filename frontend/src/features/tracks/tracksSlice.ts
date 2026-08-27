import { createSlice } from "@reduxjs/toolkit";
import type { Tracks } from "../../interfaces";
import { getTracks } from "./tracksThunk";

interface State {
    tracks: Tracks[];
    tracksLoading: boolean;
}

const initialState: State = {
    tracks: [],
    tracksLoading: false
};

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTracks.pending, (state) => {
                state.tracksLoading = true;
            })
            .addCase(getTracks.fulfilled, (state, { payload }) => {
                state.tracksLoading = false;
                state.tracks = payload;
            })
            .addCase(getTracks.rejected, (state) => {
                state.tracksLoading = false;
            });
    },
    selectors : {
        selectTracks : (state: State) => state.tracks,
        selectTracksLoading : (state: State) => state.tracksLoading,
    }
});

export const tracksReducer = tracksSlice.reducer;
export const { selectTracks, selectTracksLoading } = tracksSlice.selectors;



import {configureStore} from '@reduxjs/toolkit'
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {albumReducer} from "../features/albums/AlbumsSlice.tsx";

export const store = configureStore({
    reducer: {
        artists: artistsReducer,
        albums: albumReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
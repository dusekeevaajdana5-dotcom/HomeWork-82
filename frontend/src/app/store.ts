import {combineReducers, configureStore} from "@reduxjs/toolkit"
import {FLUSH, REHYDRATE, PAUSE, REGISTER, PERSIST, PURGE, persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {artistsReducer} from "../features/artists/artistsSlice.ts";
import {tracksReducer} from "../features/tracks/tracksSlice.ts";
import {usersReducer} from "../features/users/userSlice.ts";
import {albumReducer} from "../features/albums/AlbumsSlice.tsx";

const usersPersistConfig = {
    key: 'shop:users',
    storage: storage.default,
    whitelist: ['user']
};

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumReducer,
    tracks: tracksReducer,
    users: persistReducer(usersPersistConfig, usersReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    }
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";


export const register = createAsyncThunk(
    "artists/fetchAll",
    async () => {
        const { data } = await axiosApi.get("/artists");
        return data;
    }
)
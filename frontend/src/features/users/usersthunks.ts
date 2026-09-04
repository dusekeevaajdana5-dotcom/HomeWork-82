import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {GlobalError, LoginMutation, RegisterMutation, User, ValidationError} from "../../interfaces.ts";
import {isAxiosError} from "axios";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
    "users/register",
    async (registerMutation, {rejectWithValue}) => {
        try {
            const { data : user } = await axiosApi.post("/users", registerMutation );
            return user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError}>(
    "users/login",
    async(LoginMutation, {rejectWithValue}) => {
        try {
            const { data: user } = await axiosApi.post("users/sessions", LoginMutation);
            return user;
        } catch (error) {
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw error;
        }
    }
)
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectLoginError, selectLoginLoading} from "./userSlice.ts";
import {useNavigate} from "react-router-dom";
import {type ChangeEvent, type SubmitEvent, useState} from "react";
import type {LoginMutation} from "../../interfaces.ts";
import {login} from "./usersthunks.ts";
import {Alert, Avatar, Box, Button, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import {Link as RouterLink} from "react-router";

const Login = () => {
    const dispatch = useAppDispatch();
    const loginLoading = useAppSelector(selectLoginLoading);
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();

    const [state, setState] = useState<LoginMutation>({
        username: "",
        password: "",
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmitHandler = async (e: SubmitEvent) => {
        e.preventDefault();

        try {
            await dispatch(login(state)).unwrap();
            navigate("/");

        } catch (e) {
            console.error(e);
        }
    };


    return (
        <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                <LockOpenIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            {loginError && (
                <Alert severity={"error"} sx={{mt: 3}}>
                    {loginError.error}
                </Alert>
            )}
            <Box
                component="form"
                onSubmit={onSubmitHandler}
                sx={{mt: 3, display: 'flex', flexDirection: 'column', maxWidth: "400px", width: '100%', gap: 3}}
                noValidate
            >
                <TextField
                    required
                    label="Username"
                    name="username"
                    value={state.username}
                    onChange={onChangeHandler}
                />
                <TextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    value={state.password}
                    onChange={onChangeHandler}

                />
                <Button
                    type="submit"
                    variant="contained"
                    sx={{mb: 3}}
                    loading={loginLoading}
                >
                    Sign In
                </Button>
            </Box>
            <Link component={RouterLink} to="/register">
                Dont have an account? Register now
            </Link>
        </Box>
    )
};

export default Login;
import { Typography } from "@mui/material";
import ArtistForm from "./ui/ArtistForm.tsx";
import type { ArtistMutation } from "../../interfaces.ts";
import { createArtist } from "./artistsThunk.ts";
import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "../../app/hooks.ts";

const NewArtist = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (artist: ArtistMutation) => {
        await dispatch(createArtist(artist));
        navigate("/");
    };

    return (
        <>
            <Typography variant="h4" sx={{ mb: 2 }}>New Artist</Typography>
            <ArtistForm onSubmit={onSubmit} />
        </>
    );
};

export default NewArtist;

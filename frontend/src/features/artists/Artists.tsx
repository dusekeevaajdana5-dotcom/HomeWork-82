import { useEffect } from "react";
import { Avatar, Box, Typography, CircularProgress, Card, CardContent, CardActionArea } from "@mui/material";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {selectArtists, selectArtistsLoading} from "./artistsSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { register } from "./artistsThunk.ts"
import Grid from '@mui/material/Grid';
import {useNavigate} from "react-router-dom";

const Artists = () => {
    const dispatch = useAppDispatch();
    const artists = useAppSelector(selectArtists);
    const artistLoading = useAppSelector(selectArtistsLoading);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(register());
    }, [dispatch]);

    const onArtistClick = (artistId: string) => {
        navigate(`/artists/${artistId}/albums`);
    };

    return (
        <Box
            sx={{
                mt: 4,
                px: 2,
                pb: 4,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LibraryMusicIcon />
            </Avatar>

            <Typography variant="h5" component="h1" sx={{ mb: 4 }}>
                Artists
            </Typography>

            {artistLoading && <CircularProgress sx={{ mt: 2 }} />}

            {!artistLoading && artists && artists.length > 0 && (
                <Grid
                    container
                    spacing={3}
                    sx={{
                        width: "100%",
                        maxWidth: 1200,
                    }}
                >
                    {artists.map((artist: any) => (
                        <Grid
                            key={artist._id}
                            size={{ xs: 12, sm: 6, md: 4 }}
                            sx={{ display: "flex" }}
                        >
                            <Card
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: 6,
                                    },
                                }}
                            >
                                <CardActionArea
                                    onClick={() => onArtistClick(artist._id)}
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "stretch",
                                    }}
                                >
                                    {artist.image && (
                                        <Box
                                            component="img"
                                            src={artist.image}
                                            alt={artist.name}
                                            sx={{
                                                width: "100%",
                                                height: 180,
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            variant="h6"
                                            component="h2"
                                            gutterBottom
                                        >
                                            {artist.name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Год основания: {artist.date}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            {!artistLoading && (!artists || artists.length === 0) && (
                <Typography color="text.secondary" sx={{ mt: 2 }}>
                    There is no artist!
                </Typography>
            )}
        </Box>
    );
};

export default Artists;


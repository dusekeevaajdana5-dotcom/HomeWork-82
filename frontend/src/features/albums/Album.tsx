import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAlbumLoading, selectAlbums } from "./AlbumsSlice";
import { albumGet } from "./AlbumsThunk";
import {Card, CardActionArea, CardContent, Typography, Box, CircularProgress} from "@mui/material";
import Stack from "@mui/material/Stack";


const Album = () => {
    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbums);
    const albumLoading = useAppSelector(selectAlbumLoading);

    useEffect(() => {
        dispatch(albumGet());
    }, [dispatch]);


    if (albumLoading) {
        return (
            <Stack>
                <CircularProgress />
            </Stack>
        );
    }

    return (
        <Stack spacing={3} sx={{ padding: 2 }}>
            {albums.map((album) => (
                <Card key={album._id} sx={{ width: "100%" }}>
                    <CardActionArea
                        onClick={() => console.log(`Кликнули на альбом с ID: ${album._id}`)}
                        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {album.image && (
                            <Box
                                component="img"
                                src={album.image}
                                alt={album.name}
                                sx={{ width: 150, height: 120, objectFit: 'cover', flexShrink: 0 }}
                            />
                        )}
                        <CardContent sx={{ flexGrow: 1, paddingLeft: 3 }}>
                            <Typography variant="h6" component="h2" gutterBottom>
                                {album.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Год выпуска: {album.year}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Stack>
    );
};

export default Album;

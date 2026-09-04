import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectAlbumLoading, selectAlbums } from "./AlbumsSlice";
import { albumGet } from "./AlbumsThunk";
import { Card, CardActionArea, CardContent, Typography, Box, CircularProgress, Paper, Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

const Album = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const { artistId } = useParams<{ artistId: string }>();

    const albums = useAppSelector(selectAlbums);
    const albumLoading = useAppSelector(selectAlbumLoading);

    useEffect(() => {
        dispatch(albumGet(artistId));
    }, [dispatch, artistId]);

    if (albumLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '200px', mt: 5 }}>
                <CircularProgress />
            </Stack>
        );
    }

    const firstAlbum = albums[0];
    const artistName = firstAlbum && firstAlbum.artist && typeof firstAlbum.artist === 'object'
        ? (firstAlbum.artist as any).name
        : '';

    return (
        <Stack spacing={3} sx={{ padding: 2, maxWidth: 800, mx: 'auto' }}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'transparent' }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    {artistName ? `Albums: ${artistName}` : 'Albums list'}
                </Typography>
                <Divider sx={{ mt: 2 }} />
            </Paper>

            {albums.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                    This artist doesn't have any albums yet!
                </Typography>
            ) : (
                albums.map((album) => {
                    const currentAlbumId = album._id || (album as any).id;

                    const cardArtistName = album.artist && typeof album.artist === 'object'
                        ? (album.artist as any).name
                        : 'Unknown artist';

                    return (
                        <Card key={currentAlbumId} sx={{ width: "100%", borderRadius: 2 }} elevation={2}>
                            <CardActionArea
                                onClick={() => navigate(`/albums/${currentAlbumId}/tracks`)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', sm: 'row' },
                                    alignItems: 'stretch',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                {album.image && (
                                    <Box
                                        component="img"
                                        src={album.image}
                                        alt={album.name}
                                        sx={{
                                            width: { xs: '100%', sm: 150 },
                                            height: 150,
                                            objectFit: 'cover',
                                            flexShrink: 0
                                        }}
                                    />
                                )}
                                <CardContent sx={{ flexGrow: 1, paddingLeft: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }} gutterBottom>
                                        {album.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                        <strong>Artist:</strong> {cardArtistName}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        <strong>Album release year:</strong> {album.year}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                })
            )}
        </Stack>
    );
};

export default Album;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectTracks, selectTracksLoading } from "./tracksSlice";
import { getTracks } from "./tracksThunk";
import {
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Paper,
    Stack,
    Divider
} from "@mui/material";

const Tracks = () => {
    const dispatch = useAppDispatch();
    const tracks = useAppSelector(selectTracks);
    const tracksLoading = useAppSelector(selectTracksLoading);


    const { albumId } = useParams<{ albumId: string }>();

    useEffect(() => {
        dispatch(getTracks(albumId));
    }, [dispatch, albumId]);

    if (tracksLoading) {
        return (
            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '200px', mt: 5 }}>
                <CircularProgress />
            </Stack>
        );
    }

    if (tracks.length === 0) {
        return (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                There is no tracks!
            </Typography>
        );
    }

    const sortedTracks = [...tracks].sort((a, b) => a.number - b.number);

    return (
        <Paper elevation={2} sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, borderRadius: 2 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 'bold', pl: 2 }}>
               Tracks list
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
                {sortedTracks.map((track) => (
                    <ListItem
                        key={track._id}
                        sx={{
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'action.hover' },
                            transition: 'background-color 0.2s'
                        }}
                    >

                        <Typography
                            variant="body1"
                            sx={{ width: 30, fontWeight: 'bold', color: 'text.secondary' }}
                        >
                            {track.number}.
                        </Typography>


                        <ListItemText
                            primary={track.name}
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                        />

                        {track.duration && (
                            <Typography variant="body2" color="text.secondary">
                                {track.duration}
                            </Typography>
                        )}
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Tracks;
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTracks, selectTracksLoading } from './tracksSlice';
import { getTracks } from './tracksThunk';
import { List, ListItem, Typography, CircularProgress, Paper, Stack, Divider, ListItemText } from '@mui/material';

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

    if (!tracks || tracks.length === 0) {
        return (
            <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'text.secondary' }}>
                There are no tracks!
            </Typography>
        );
    }

    return (
        <Paper elevation={2} sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2, borderRadius: 2 }}>
            <Typography variant="h5" component="h1" sx={{ mb: 2, fontWeight: 'bold', pl: 2 }}>
                Tracks list
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <List>
                {tracks.map((track) => (
                    <ListItem key={track._id} divider>
                        <ListItemText
                            primary={track.name}
                            secondary={track.duration ? `Duration: ${track.duration}` : null}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default Tracks;

import {useState, type MouseEvent} from "react";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import type { UserMutaition} from "../../interfaces.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {unsetUser} from "../../features/users/userSlice.ts";


interface Props {
    user: UserMutaition;
}

const UserMenu = ({user}: Props) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(unsetUser());
    };




    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
                sx={{ textTransform: 'none', display: 'flex', alignItems: 'center', gap: 1.5 }}
            >
                <span>Hi, {user.displayName || user.username}</span>

                <Avatar
                    src={user.avatar}
                    alt={user.displayName || user.username}
                    sx={{ width: 32, height: 32, boxShadow: 1 }}
                >
                    {(user.displayName || user.username).charAt(0).toUpperCase()}
                </Avatar>

            </Button>
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
                slotProps={{ paper: { sx: { mt: 1 } } }}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
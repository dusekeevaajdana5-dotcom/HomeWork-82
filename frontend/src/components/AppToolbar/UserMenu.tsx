import {useState, type MouseEvent} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import type {User} from "../../interfaces.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {unsetUser} from "../../features/users/userSlice.ts";


interface Props {
    user: User;
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
            >
                Hi, {user.username}
            </Button>
            <Menu
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;
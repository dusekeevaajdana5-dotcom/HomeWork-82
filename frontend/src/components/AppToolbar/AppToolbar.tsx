import {AppBar, styled, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {selectUser} from "../../features/users/userSlice.ts";
import {useAppSelector} from "../../app/hooks.ts";
import UserMenu from "../AppToolbar/UserMenu.tsx";
import AnonymousMenu from "../AppToolbar/AnonymousMenu.tsx";


const StyledLink = styled(Link)({
    color: 'White',
    textDecoration: 'none',

})

const AppToolbar = () => {
    const user = useAppSelector(selectUser);

    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <StyledLink to="/">Artists</StyledLink>
                </Typography>
                {user ?  <UserMenu user={user}/> : <AnonymousMenu/>

                }
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
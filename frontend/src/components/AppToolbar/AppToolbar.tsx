import {AppBar, Button, styled, Toolbar, Typography} from "@mui/material";
import {Link, NavLink} from "react-router-dom";

const AppToolbar = () => {

    const StyledLink = styled(Link)({
      color: 'White',
        textDecoration: 'none',

    })

    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <StyledLink to="/">Artists</StyledLink>
                </Typography>
                <Button component={NavLink} to="/register" color="inherit">Register</Button>
                <Button component={NavLink} to="/login" color="inherit">Sign In</Button>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
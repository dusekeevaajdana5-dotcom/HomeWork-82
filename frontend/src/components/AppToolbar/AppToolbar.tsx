import {AppBar, styled, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AppToolbar = () => {

    const StyledLink = styled(Link)({
      color: 'White',
        textDecoration: 'none',

    })

    return (
        <AppBar position="sticky" sx={{mb : 2, bgcolor: 'grey.800',}}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{flexGrow : 1}}>
                   <StyledLink to="/">Artists</StyledLink>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;
import React from 'react';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const MainNavbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Main Navbar
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default MainNavbar

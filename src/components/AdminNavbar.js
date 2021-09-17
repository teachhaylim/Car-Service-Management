import React, { useState } from 'react';
import { Typography, IconButton, Hidden, Toolbar, AppBar, MenuItem, Grid, Popover, Avatar } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import Flag from 'react-flagkit';
import i18n from "i18next";
import Cookies from 'universal-cookie';
import basicConfig from 'utils/basicConfig';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import store, { RemoveToken } from 'store';
import { getDiceBearAvatar } from 'utils/basicConfig';
import { styled } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        // zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('md')]: {
            paddingLeft: basicConfig.drawerSize,
        },
        color: "black",
        backgroundColor: theme.palette.background.white,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginRight: theme.spacing(2),
        // fontFamily: 'Battambang',
    },
    menuItem: {
        width: "150px",
        marginTop: 8,
        marginBottom: 8,
        "&:hover": {
            background: "lightgray",
        }
    }
}));

const StyledAvatar = styled(Avatar)(() => {
    return {
        marginRight: 8,
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)",
    }
});

const langItems = [
    { country: "US", title: "English", value: "en" },
    { country: "KH", title: "ភាសាខ្មែរ", value: "kh" },
];

const AdminNavbar = ({ handleMobileOpen }) => {
    const classes = useStyles();
    const [langMenu, setlangMenu] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const user = store.getState().user;

    const handleLogout = () => {
        dispatch(RemoveToken());
    };

    const handleLangOnClose = () => {
        setlangMenu(null);
    };

    const handleLangMenuClick = (e) => {
        setlangMenu(e.currentTarget);
    };

    const handleProfileMenuClick = (e) => {
        setProfileMenu(e.currentTarget);
    }

    const handleProfileMenuOnClose = (e) => {
        setProfileMenu(null);
    }

    const handleLangeChange = (value) => {
        setlangMenu(null);
        i18n.changeLanguage(value);

        const date = new Date();
        date.setDate(date.getDate() + 7);

        cookies.set('lang', value, { expires: date });
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton edge="start" className={classes.menuButton} onClick={handleMobileOpen}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Typography variant="h6" className={classes.title}>
                        Admin Navbar
                    </Typography>

                    <IconButton sx={{ mr: 1 }} onClick={handleLangMenuClick}>
                        {
                            i18n.language === "en" ? <Flag country="US" /> : <Flag country="KH" />
                        }
                    </IconButton>

                    <Popover
                        elevation={6}
                        anchorEl={langMenu}
                        open={!!langMenu}
                        onClose={handleLangOnClose}
                        disableScrollLock={true}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {
                            langItems.map((item, index) => (
                                <MenuItem className={classes.menuItem} key={index} onClick={() => handleLangeChange(item.value)}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Flag country={item.country} style={{ paddingTop: 6 }} />
                                        </Grid>

                                        <Grid item>
                                            {item.title}
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            ))
                        }
                    </Popover>

                    <StyledAvatar src={getDiceBearAvatar(store.getState().user?.id)} onClick={handleProfileMenuClick} />

                    <Popover
                        elevation={6}
                        anchorEl={profileMenu}
                        open={!!profileMenu}
                        onClose={handleProfileMenuOnClose}
                        disableScrollLock={true}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Typography variant="h6" className={classes.title}>
                                    {user.id ? user.firstName + " " + user.lastName : ""}
                                </Typography>
                            </Grid>
                        </Grid>

                        <MenuItem className={classes.menuItem} component={RouterLink} to="/login" onClick={handleLogout} edge="end" color="inherit" aria-label="menu">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item>
                                    <IconButton>
                                        <ExitToApp />
                                    </IconButton>
                                </Grid>

                                <Grid item>
                                    Logout
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </Popover>

                    {/* <IconButton onClick={handleLogout} component={RouterLink} to="/login" edge="end" color="inherit" aria-label="menu">
                        <ExitToApp />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AdminNavbar

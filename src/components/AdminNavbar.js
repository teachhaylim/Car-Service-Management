import React, { useState } from 'react';
import { Typography, IconButton, Hidden, Toolbar, AppBar, MenuItem, Grid, Popover, Avatar } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import Flag from 'react-flagkit';
import i18n from "i18next";
import Cookies from 'universal-cookie';
import basicConfig from 'utils/basicConfig';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { SetLogout } from 'store';
import { getDiceBearAvatar } from 'utils/generalFunc';
import { langItems } from 'utils/basicConfig';
import moment from 'moment';

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
        },
    }
}));

const StyledAvatar = styled(Avatar)(() => {
    return {
        marginRight: 8,
        boxShadow: "0 3px 6px rgba(72, 72, 72, 0.5)",
    }
});

const AdminNavbar = ({ handleMobileOpen }) => {
    const classes = useStyles();
    const [langMenu, setlangMenu] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user, shallowEqual);

    const handleLogout = () => {
        dispatch(SetLogout());
        cookies.remove("XTOK");
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

        cookies.set('lang', value, { expires: moment().add(7, "days").toDate() });
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            onClick={handleMobileOpen}
                            size="large">
                            <MenuIcon />
                        </IconButton>
                    </Hidden>

                    <Typography variant="h6" className={classes.title}>
                        Admin Navbar
                    </Typography>

                    <IconButton sx={{ mr: 1 }} onClick={handleLangMenuClick} size="large">
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
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
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

                    <StyledAvatar variant="rounded" src={`${basicConfig.fileUrl}${user.profilePic}`} onClick={handleProfileMenuClick} />

                    <Popover
                        elevation={6}
                        anchorEl={profileMenu}
                        open={!!profileMenu}
                        onClose={handleProfileMenuOnClose}
                        disableScrollLock={true}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
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

                    {/* <IconButton
                        onClick={handleLogout}
                        component={RouterLink}
                        to="/login"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        size="large">
                        <ExitToApp />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AdminNavbar

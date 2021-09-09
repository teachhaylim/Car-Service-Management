import React from 'react';
import { Typography, IconButton, Hidden, Toolbar, AppBar, MenuItem, Grid, Popover } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import Flag from 'react-flagkit';
import i18n from "i18next";
import Cookies from 'universal-cookie';
import basicConfig from 'utils/basicConfig';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';

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

const langItems = [
    { country: "US", title: "English", value: "en" },
    { country: "KH", title: "ភាសាខ្មែរ", value: "kh" },
];

const AdminNavbar = ({ handleMobileOpen }) => {
    const classes = useStyles();
    const [langMenu, setlangMenu] = React.useState(null);
    const cookies = new Cookies();

    const handleLangOnClose = () => {
        setlangMenu(null);
    }

    const handleLangMenuClick = (e) => {
        setlangMenu(e.currentTarget);
    }

    const handleLangeChange = (value) => {
        setlangMenu(null);
        i18n.changeLanguage(value);

        const date = new Date();
        date.setDate(date.getDate() + 7);

        cookies.set('lang', value, { expires: date });
    }

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

                    <IconButton onClick={handleLangMenuClick}>
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

                    <IconButton edge="end" color="inherit" aria-label="menu">
                        <ExitToApp />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AdminNavbar

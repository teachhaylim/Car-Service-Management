import React from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        padding: 12,
        transition: "0.25s all",
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: theme.borderRadius,
        "&:hover": {
            boxShadow: "0 3px 7px rgba(72, 72, 72, 0.5)",
            backgroundColor: theme.palette.secondary.main,
        },
        "& .MuiSvgIcon-root": {
            color: "white",
        },
        // "& .MuiTypography-root": {
        //     fontWeight: 300,
        // },
    },
    inactive: {
        color: "black",
        padding: 12,
        transition: "0.25s all",
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: theme.borderRadius,
        "& .MuiSvgIcon-root": {
            color: "black",
        },
        // "& .MuiTypography-root": {
        //     fontWeight: 300,
        // },
        "&:hover": {
            boxShadow: "0 3px 7px rgba(72, 72, 72, 0.3)",
            color: "black",
            "& .MuiSvgIcon-root": {
                color: "black",
                transition: "0.3s all",
            },
        },
    }
}));

const Navitem = ({ title, href, icon }) => {
    const classes = useStyles();
    const location = useLocation();
    const active = `/app/${href}` ? !!matchPath({
        path: `/app/${href}`,
        end: false
    }, location.pathname) : false;

    return (
        <Box mx={2} my={1.5}>
            <ListItem className={active ? classes.active : classes.inactive} component={RouterLink} to={href}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{title}</ListItemText>
            </ListItem>
        </Box>
    )
}

Navitem.propTypes = {
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
}

export default Navitem;

import React from 'react';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    active: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        padding: 12,
        transition: "0.3s ease-in-out",
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: theme.borderRadius,
        "&:hover": {
            boxShadow: "0 3px 8px rgba(72, 72, 72, 0.4)",
            backgroundColor: theme.palette.secondary.main,
        },
        "& .text": {
            marginLeft: 12,
        },
    },
    inactive: {
        color: "black",
        padding: 12,
        transition: "0.3s ease-in-out",
        outline: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: theme.borderRadius,
        "&:hover": {
            boxShadow: "0 3px 8px rgba(72, 72, 72, 0.4)",
            backgroundColor: theme.palette.secondary.light,
            color: "white",
        },
        "& .text": {
            marginLeft: 12,
        }
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
        <Box mx={2} my={1}>
            <ListItem className={active ? classes.active : classes.inactive} component={RouterLink} to={href}>
                <div>{icon}</div>
                <div className="text">{title}</div>
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

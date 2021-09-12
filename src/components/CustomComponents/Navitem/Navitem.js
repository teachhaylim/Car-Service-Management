import React from 'react';
import {
    NavLink as RouterLink,
    matchPath,
    useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

const Navitem = ({ title, href, icon }) => {
    const location = useLocation();

    // eslint-disable-next-line
    const active = `/app/${href}` ? !!matchPath({
        path: href,
        end: false
    }, location.pathname) : false;

    return (
        <Box my={0}>
            <ListItem
                button
                component={RouterLink}
                to={href}
            >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
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

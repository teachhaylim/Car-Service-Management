import { Box, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import React from 'react'
import basicConfig from 'utils/basicConfig';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    appName: {
        fontWeight: "normal",
    },
    heart: {
        color: "red",
    }
}));

const AdminFooter = () => {
    const classes = useStyles();

    return (
        <Box my={3}>
            <Grid justifyContent="space-between" container>
                <Grid item>
                    <Typography>
                        &copy; {moment().format("YYYY")} - <span className={classes.appName}>{basicConfig.appName}</span>
                    </Typography>
                </Grid>

                <Grid item>
                    <Typography>
                        Made with <span className={classes.heart}>❤</span> by Teachhay
                    </Typography>
                </Grid>
            </Grid>
        </Box >
    )
}

export default AdminFooter;
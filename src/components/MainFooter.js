import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react'

const MainFooter = () => {
    return (
        <>
            <Grid justifyContent="center" container>
                <Grid item>
                    <Typography>
                        &#169; {moment().format("YYYY")} - Made with <span style={{ color: "red" }}>❤</span> by Teachhay
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default MainFooter;
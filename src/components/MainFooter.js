import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react'

const MainFooter = () => {
    return (
        <Box my={3}>
            <Grid justifyContent="center" container>
                <Grid item>
                    <Typography>
                        Made with <span style={{ color: "red" }}>❤</span> by Teachhay
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default MainFooter;
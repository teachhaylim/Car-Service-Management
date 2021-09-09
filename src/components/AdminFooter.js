import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react'

const AdminFooter = () => {
    return (
        <Box my={3}>
            <Grid justifyContent="flex-end" container>
                <Grid item>
                    <Typography>
                        Made with <span style={{ color: "red" }}>❤</span> by Teachhay
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default AdminFooter;
import React from 'react'
import { styled } from '@mui/system';
import { AttachMoney } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const StyledGrid = styled(Grid)(() => {
    return {
        cursor: "default",
        padding: 16,
        borderRadius: 6,
        boxShadow: "0 4px 8px #ccc",
        backgroundColor: "#fff",
        "&:hover": {
            backgroundColor: "#f5f5f5",
        },
    }
});

const DashboardItem = ({ title, icon, value, valueColor, titleColor, iconColor }) => {
    return (
        <>
            <Grid item container xs={12} sm={6} lg={4} sx={{ padding: 1 }}>
                <StyledGrid container>
                    <Grid item container justifyContent="center" alignItems="center" xs={1}>
                        {icon || <AttachMoney sx={{ color: iconColor || "gray" }} />}
                    </Grid>

                    <Grid item container justifyContent="start" alignItems="center" xs>
                        <Typography sx={{ color: titleColor || "black", fontSize: 18, fontWeight: "bold" }}>
                            {title || "Placeholder title"}
                        </Typography>
                    </Grid>

                    <Grid item container justifyContent="end" alignItems="center" xs>
                        <Typography sx={{ color: valueColor || "black", fontSize: 18, fontWeight: "bold" }} >
                            {value || "Placeholder value"}
                        </Typography>
                    </Grid>
                </StyledGrid>
            </Grid>
        </>
    )
};

DashboardItem.propTypes = {
    title: PropTypes.any.isRequired,
    icon: PropTypes.node.isRequired,
    value: PropTypes.any.isRequired,
    valueColor: PropTypes.string,
    titleColor: PropTypes.string,
    iconColor: PropTypes.string,
};

export default DashboardItem;
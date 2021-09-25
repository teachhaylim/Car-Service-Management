/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { HomeRounded } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Typography)(({ theme }) => {
    return {
        color: theme.palette.secondary.contrastText,
        '&:hover, &:focus': {
            color: theme.palette.secondary.main,
        },
    };

});
const StyledTypographyLink = styled(Typography)(({ theme }) => {
    return {
        color: theme.palette.secondary.contrastText,
        textTransform: "capitalize",
        fontWeight: "bold",
        letterSpacing: 1.2,
        '&:hover, &:focus': {
            color: theme.palette.secondary.main,
        },
    };
});

// eslint-disable-next-line
const StyledTypography = styled(Typography)(({ theme }) => {
    return {
        cursor: "default",
        textTransform: "capitalize",
        fontWeight: "bold",
        letterSpacing: 1.2,
    };
});

export default function PageNavigation() {
    const pathnames = useLocation().pathname.split('/').filter((x) => x);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }} mb={1.5}>
            <Breadcrumbs aria-label="breadcrumb" separator="/">
                {
                    pathnames.map((item, key) => {
                        if (item === "app") {
                            return (
                                <RouterLink to="/" sx={{}} key={key}>
                                    <StyledLink>
                                        <HomeRounded sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }} />
                                    </StyledLink>
                                </RouterLink>
                            )
                        }

                        if (key === pathnames.length - 1) {
                            return (
                                <StyledTypography key={key}>
                                    {item}
                                </StyledTypography>
                            )
                        }

                        return (
                            <StyledTypographyLink  key={key}component={RouterLink} to={item}>
                                {item}
                            </StyledTypographyLink>
                        )
                    })
                }
            </Breadcrumbs>
        </Box>
    );
}

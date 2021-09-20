/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { generalList, superAdminList } from 'utils/basicConfig';
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Typography)(({ theme }) => {
    return {
        color: "black",
        '&:hover, &:focus': {
            color: theme.palette.secondary.dark,
            textDecoration: "underline",
        },
    };
});

const StyledTypography = styled(Typography)(({ theme }) => {
    return {
        cursor: "default",
        fontSize: 22,
        letterSpacing: 1.2,
        fontFamily: "Fredoka One, cursive !important",
        // '&:hover, &:focus': {
        //     color: theme.palette.secondary.dark,
        // },
    };
});

export default function PageNavigation() {
    const pathnames = useLocation().pathname.split('/').filter((x) => x);
    const current = [...generalList, ...superAdminList].filter(p => p.href === pathnames[1])[0];
    const { t } = useTranslation();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: "100%" }} mt={0} mb={1.5}>
            <Box mb={0}>
                <StyledTypography >
                    {t(current?.alternateTitle)}
                </StyledTypography>
            </Box>

            <Breadcrumbs aria-label="breadcrumb" separator="/">
                <RouterLink to="/" sx={{}}>
                    <StyledLink>
                        <HomeIcon sx={{ display: 'flex', alignItems: 'center', marginBottom: 0.5 }} fontSize="small" />
                    </StyledLink>
                </RouterLink>

                <RouterLink to="/" sx={{}}>
                    <StyledLink>
                        {t(current?.parent)}
                    </StyledLink>
                </RouterLink>

                <Typography color="text.primary" sx={{ cursor: "default" }}>
                    {t(current?.title)}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
}

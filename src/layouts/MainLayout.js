import React from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import MainNavbar from 'components/MainNavbar';
import MainFooter from 'components/MainFooter';
import { Box, styled } from '@mui/system';

const CustomBox = styled(Box)(() => {
    return {
        height: "calc(100vh - 88px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
})

const MainLayout = () => {
    return (
        <>
            <Container disableGutters maxWidth="" sx={{ height: "100vh", backgroundColor: "#e0e0e0" }}>
                <MainNavbar />

                <CustomBox>
                    <Outlet />
                </CustomBox>

                <MainFooter />
            </Container>
        </>
    )
}

export default MainLayout;

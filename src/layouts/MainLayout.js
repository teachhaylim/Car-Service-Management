import React from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from '@material-ui/core';
import MainNavbar from 'components/MainNavbar';
import MainFooter from 'components/MainFooter';

const MainLayout = () => {
    return (
        <>
            <MainNavbar />

            <Container maxWidth="xl">
                <Outlet />

                <MainFooter />
            </Container>
        </>
    )
}

export default MainLayout;

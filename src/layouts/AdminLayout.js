import React from 'react';
import AdminNavbar from 'components/AdminNavbar';
import { Outlet } from 'react-router-dom';
import { Container, Toolbar } from '@material-ui/core';
import AdminSidebar from 'components/AdminSidebar';
import { useState } from 'react';
import basicConfig from 'utils/basicConfig';
import AdminFooter from 'components/AdminFooter';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PageNavigation from 'components/CustomComponents/RouteNavigation';

const useStyles = makeStyles((theme) => ({
    adminLayout: {
        marginTop: 20,
        paddingLeft: 0,
        [theme.breakpoints.up('md')]: {
            paddingLeft: basicConfig.drawerSize,
        }
    }
}));

const Adminlayout = () => {
    const classes = useStyles();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMobileOpen = () => {
        setMobileOpen(!mobileOpen);
    }

    return (
        <>
            <AdminSidebar mobileOpen={mobileOpen} handleMobileOpen={handleMobileOpen} />

            <PerfectScrollbar>
                <div className={classes.adminLayout}>
                    <Container maxWidth="">
                        <AdminNavbar handleMobileOpen={handleMobileOpen} />

                        <Toolbar />

                        <PageNavigation />

                        <Outlet />

                        <AdminFooter />
                    </Container>
                </div>
            </PerfectScrollbar>
        </>
    )
}

export default Adminlayout;
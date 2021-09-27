import { Hidden, Drawer, List, Typography, Box, Divider, Avatar } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import basicConfig from 'utils/basicConfig';
import { generalList } from 'utils/basicConfig';
import logo from "assets/logo/logo_1.png";
import { superAdminList } from 'utils/basicConfig';
import { makeStyles } from '@mui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Navitem } from './CustomComponents/Navitem';
import { adminList } from 'utils/basicConfig';
import { shallowEqual, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { getDiceBearAvatar } from 'utils/basicConfig';
import { getRole } from 'utils/basicConfig';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: basicConfig.drawerSize,
        display: "flex",
        justifyContent: "space-between",
    },
    toolbar: {
        height: 64,
        display: "flex",
        alignItems: "center",
    },
    title: {
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontFamily: "Fredoka One, cursive !important",
    },
    header: {
        display: "flex",
        alignItems: "center",
        marginLeft: 16,
        marginRight: 16,
    },
    headerImgContainer: {
        width: "50px",
        height: "40px",
        marginRight: "10px",
    },
    headerImg: {
        objectFit: "contain",
        height: "100%",
        width: "100%",
    },
    section: {
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "1.2px",
        color: theme.palette.text.primary_dark,
    },
}));

const ProfileCard = styled("div")(({ theme }) => {
    return {
        backgroundColor: theme.palette.primary.light,
        margin: "16px",
        borderRadius: 6,
        boxShadow: "0 4px 6px 2px rgba(0, 0, 0, 0.4)",
        display: "flex",
        color: "white",
    };
});

const ProfileAvatar = styled(Avatar)(({ theme }) => {
    return {
        boxShadow: "0 0 0 4px rgba(255, 255, 255, 0.7)",
        backgroundColor: 'white',
    }
})

const AdminSidebar = ({ window, handleMobileOpen, mobileOpen }) => {
    const classes = useStyles();
    const role = useSelector(store => store.role, shallowEqual);
    const user = useSelector(store => store.user, shallowEqual);
    const container = window !== undefined ? () => window().document.body : undefined;
    const { t } = useTranslation();

    const SectionTitle = ({ title }) => {
        return (
            <Box mt={2} mb={1} mx={2}>
                <Typography variant="" className={classes.section}>
                    {t(title)}
                </Typography>
            </Box>
        )
    }

    const DrawerContent = () => {
        return (
            <>
                {/* //TODO change to use MUI */}
                <div className={classes.toolbar}>
                    <div className={classes.header}>
                        <div className={classes.headerImgContainer}>
                            <img src={logo} alt="" className={classes.headerImg} />
                        </div>

                        <Typography variant="h6" className={classes.title}>
                            {basicConfig.appName}
                        </Typography>
                    </div>
                </div>

                <Divider />

                <SectionTitle title="general" />

                <List sx={{ padding: 0, margin: 0 }}>
                    {
                        generalList.map((item, index) => (
                            <Navitem key={index} title={t(item.title)} icon={item.icon} href={item.href} />
                        ))
                    }
                </List>

                <Divider />

                <SectionTitle title="management" />

                <List sx={{ padding: 0, margin: 0 }}>
                    {
                        adminList.map((item, index) => (
                            <Navitem key={index} title={t(item.title)} icon={item.icon} href={item.href} />
                        ))
                    }
                </List>

                <Divider />

                <SectionTitle title="operation" />

                <List sx={{ padding: 0, margin: 0 }}>
                    {
                        superAdminList.map((item, index) => (
                            <Navitem key={index} title={t(item.title)} icon={item.icon} href={item.href} />
                        ))
                    }
                </List>
            </>
        )
    };

    // eslint-disable-next-line
    const ProfileContent = () => {
        return (
            <ProfileCard>
                <Box sx={{ p: 1.5, display: "flex", alignItems: "center" }}>
                    <ProfileAvatar src={getDiceBearAvatar(user?.id)} />
                </Box>
                <Box sx={{ pt: 1.5, pl: 0, pr: 1.5, pb: 1.5, width: "100%" }}>
                    <Box sx={{ textTransform: "uppercase", fontWeight: "bold", letterSpacing: 1.4 }}>
                        {user?.firstName}
                    </Box>
                    <Box sx={{ textTransform: "capitalize", fontSize: 14, fontWeight: "medium", letterSpacing: 1.4 }}>
                        {getRole(role)}
                    </Box>
                </Box>
            </ProfileCard>
        )
    };

    return <>
        {/* Mobile Section */}
        <Hidden smUp implementation="css">
            <Drawer
                container={container}
                classes={{ paper: classes.drawerPaper }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleMobileOpen}
                ModalProps={{ keepMounted: true }}
            >
                <PerfectScrollbar>
                    {<DrawerContent />}
                </PerfectScrollbar>

                {/* <ProfileContent /> */}
            </Drawer>
        </Hidden>

        {/* Desktop Section */}
        <Hidden mdDown implementation="css">
            <Drawer
                variant="permanent"
                open
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <PerfectScrollbar>
                    {<DrawerContent />}
                </PerfectScrollbar>

                {/* <ProfileContent /> */}
            </Drawer>
        </Hidden>
    </>;
}

export default AdminSidebar;
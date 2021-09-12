import { Hidden, Drawer, List, Typography, Box, Divider } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import basicConfig from 'utils/basicConfig';
import { generalList } from 'utils/basicConfig';
import logo from "assets/logo/logo_1.png";
import { superAdminList } from 'utils/basicConfig';
import { makeStyles } from '@material-ui/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Navitem } from './CustomComponents/Navitem';

const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: basicConfig.drawerSize,
    },
    toolbar: {
        height: 64,
        display: "flex",
        alignItems: "center",
    },
    title: {
        textTransform: "uppercase",
        fontWeight: "bold",
        letterSpacing: "2px",
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

const AdminSidebar = ({ window, handleMobileOpen, mobileOpen }) => {
    const classes = useStyles();
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
                <div className={classes.toolbar}>
                    <div className={classes.header}>
                        <div className={classes.headerImgContainer}>
                            <img src={logo} alt="" className={classes.headerImg} />
                        </div>

                        <Typography variant="h6" className={classes.title}>
                            ZenoTech
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
                        superAdminList.map((item, index) => (
                            <Navitem key={index} title={t(item.title)} icon={item.icon} href={item.href} />
                        ))
                    }
                </List>
            </>
        )
    }

    return (
        <>
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
                    {<DrawerContent />}
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
                </Drawer>
            </Hidden>
        </>
    )
}

export default AdminSidebar;
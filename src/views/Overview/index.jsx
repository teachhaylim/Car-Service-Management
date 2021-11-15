import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Divider, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import DashboardItem from 'components/Overviews/DashboardItem';
import { Balcony, PeopleAlt, Storefront } from '@mui/icons-material';
import { Line } from 'react-chartjs-2';
import { FetchDashboardAdmin } from 'api/stats.api';
import { useTranslation } from 'react-i18next';

const lineBarOptions = {
    scales: {
        y: {
            beginAtZero: true
        }
    }
};

const StyledBox = styled(Box)(() => {
    return {
        padding: 24,
        cursor: "default",
        borderRadius: 6,
        border: '1px solid #e0e0e0',
        boxShadow: "0 4px 8px #ccc",
        backgroundColor: "#fff",
    }
});

const DashboardAdmin = () => {
    const { t } = useTranslation();

    //General Info
    const [totalCategories, setTotalCategories] = useState({});
    const [totalShops, setTotalShops] = useState({});
    const [totalUsers, setTotalUsers] = useState({});

    //Chart data
    const [lineChartDataUser, setLineChartDataUser] = useState({
        labels: [],
        datasets: [
            {
                label: 'Placeholder label',
                data: [],
                backgroundColor: [
                    "rgba(46, 125, 50, 0.6)",
                ],
                borderColor: [
                    "rgb(0, 80, 5)",
                ],
                borderWidth: 1,
            },
        ],
    });
    const [lineChartDataShop, setLineChartDataShop] = useState({
        labels: [],
        datasets: [
            {
                label: 'Placeholder label',
                data: [],
                backgroundColor: [
                    'rgba(21, 101, 192, 0.6)',
                ],
                borderColor: [
                    'rgb(0, 60, 143)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = (query) => {
            FetchDashboardAdmin(query)
                .then(res => {
                    if (res && res.meta === 200) {
                        const { newlyRegisteredShops, newlyRegisteredUsers, totalCategories, totalShops, totalUsers } = res.data;

                        setTotalCategories(totalCategories);
                        setTotalShops(totalShops);
                        setTotalUsers(totalUsers);

                        setLineChartDataUser({
                            labels: newlyRegisteredUsers.map(item => item.date),
                            datasets: [
                                {
                                    label: t("newlyRegisteredUsers"),
                                    data: newlyRegisteredUsers.map(item => item.count),
                                    backgroundColor: [
                                        "rgba(46, 125, 50, 0.6)",
                                    ],
                                    borderColor: [
                                        "rgb(0, 80, 5)",
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        });

                        setLineChartDataShop({
                            labels: newlyRegisteredShops.map(item => item.date),
                            datasets: [
                                {
                                    label: t("newlyRegisteredShops"),
                                    data: newlyRegisteredShops.map(item => item.count),
                                    backgroundColor: [
                                        'rgba(21, 101, 192, 0.6)',
                                    ],
                                    borderColor: [
                                        'rgb(0, 60, 143)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        });

                        return;
                    }

                    toast.error(res.message);
                })
                .catch(err => {
                    toast.error(err.message);
                });
        }

        fetchData();
    }, []);

    return (
        <>
            <Grid item container>
                <Grid item xs={12}>
                    <Box mb={2}>
                        <Divider textAlign="center">
                            <Typography variant="h6">{t("generalInfo")}</Typography>
                        </Divider>
                    </Box>
                </Grid>

                <DashboardItem title={t("totalCategories")} value={totalCategories.total} icon={<Balcony sx={{ color: "#c62828" }} />} valueColor="#c62828" />

                <DashboardItem title={t("totalShops")} value={totalShops.total} icon={<Storefront sx={{ color: "#6a1b9a" }} />} valueColor="#6a1b9a" />

                <DashboardItem title={t("totalUsers")} value={totalUsers.total} icon={<PeopleAlt sx={{ color: "#1565c0" }} />} valueColor="#1565c0" />

                <Grid item xs={12}>
                    <Box my={2}>
                        <Divider textAlign="center">
                            <Typography variant="h6">{t("statistics")}</Typography>
                        </Divider>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StyledBox m={1}>
                        <Line data={lineChartDataUser} options={lineBarOptions} />
                    </StyledBox>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StyledBox m={1}>
                        <Line data={lineChartDataShop} options={lineBarOptions} />
                    </StyledBox>
                </Grid>
            </Grid>
        </>
    )
}

export default DashboardAdmin

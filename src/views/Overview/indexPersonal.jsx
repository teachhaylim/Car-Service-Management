import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Divider, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import DashboardItem from 'components/Overviews/DashboardItem';
import { FetchDashboardPersonal } from 'api/stats.api';
import { AccountBalanceWallet, Assessment, Assignment, AssignmentLate, LocalAtm, SettingsApplications } from '@mui/icons-material';
import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';
import { shallowEqual, useSelector } from 'react-redux';
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

const DashboardPersonal = () => {
    const { t } = useTranslation();

    //General Info
    const [canceledAppointments, setCanceledAppointments] = useState([]);
    const [pendingAppointments, setPendingAppointments] = useState([]);
    const [completedAppointments, setCompletedAppointments] = useState([]);
    const [numberOfServicesOffered, setNumberOfServicesOffered] = useState([]);
    const [totalAppointments, setTotalAppointments] = useState({});
    const [totalIncome, setTotalIncome] = useState({});
    const shopInfo = useSelector(state => state.shop, shallowEqual);

    //Chart - unused
    // const [numberOfAppointedService, setNumberOfAppointedServices] = useState([]);
    // const [numberOfServicesByUser, setNumberofServicesByUser] = useState([]);

    //Chart data
    const [barChartData, setBarChartData] = useState({
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
    const [lineChartData, setLineChartData] = useState({
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
        const filters = {
            bd: "",
            ed: "",
            isActive: true,
            ...(shopInfo?.id ? { sellCompany: shopInfo?.id } : {}),
        };

        const fetchData = (query) => {
            FetchDashboardPersonal(query)
                .then(res => {
                    if (res && res.meta === 200) {
                        const { canceledAppointments, completedAppointments, countOfAppointedServices, countOfDailyAppointments, numberOfServicesByUser, numberOfServicesOffered, pendingAppointments, totalAppointments, totalIncome } = res.data;

                        setCanceledAppointments(canceledAppointments);
                        setCompletedAppointments(completedAppointments);
                        setPendingAppointments(pendingAppointments);
                        // setNumberOfAppointedServices(countOfAppointedServices);
                        // setNumberofServicesByUser(numberOfServicesByUser);
                        setNumberOfServicesOffered(numberOfServicesOffered);
                        setTotalAppointments(totalAppointments);
                        setTotalIncome(totalIncome);

                        // const tempData = [];

                        // totalAppointments.appointments.forEach(item => {
                        //     const data = tempData.find(x => x.date === item.createdAt);

                        //     if (data) return data.count += 1;

                        //     tempData.push({ date: item.createdAt, user: item.userId.firstName, count: 1 });
                        // });

                        setBarChartData({
                            labels: countOfAppointedServices.map(item => item.service) || [],
                            datasets: [
                                {
                                    label: t("numberOfAppointedServices"),
                                    data: countOfAppointedServices.map(item => item.count) || [],
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

                        setLineChartData({
                            labels: countOfDailyAppointments.map(item => moment(item.date).format("DD/MM/YYYY")) || [],
                            datasets: [
                                {
                                    label: t("numberOfAppointments"),
                                    data: countOfDailyAppointments.map(item => item.count) || [],
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

        if (shopInfo && Object.keys(shopInfo).length > 0) {
            fetchData(filters);
            return;
        }

        return () => {
            setCanceledAppointments([]);
            setCompletedAppointments([]);
            setPendingAppointments([]);
            setNumberOfServicesOffered([]);
            setTotalAppointments({});
            setTotalIncome({});

            // setNumberOfAppointedServices([]);
            // setNumberofServicesByUser([]);
        }
    }, [shopInfo]);

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

                <DashboardItem title={t("totalIncome")} value={`$ ${totalIncome.total || 0}`} icon={<LocalAtm sx={{ color: "#c62828" }} />} valueColor="#c62828" />

                <DashboardItem title={t("totalAppointments")} value={`${totalAppointments.total || 0}`} icon={<AccountBalanceWallet sx={{ color: "#6a1b9a" }} />} valueColor="#6a1b9a" />

                <DashboardItem title={t("totalServices")} value={`${numberOfServicesOffered.length}`} icon={<SettingsApplications sx={{ color: "#1565c0" }} />} valueColor="#1565c0" />

                <DashboardItem title={t("pendingAppointments")} value={`${pendingAppointments.length}`} icon={<Assessment sx={{ color: "#00695c" }} />} valueColor="#00695c" />

                <DashboardItem title={t("completedAppointments")} value={`${completedAppointments.length}`} icon={<Assignment sx={{ color: "#ef6c00" }} />} valueColor="#ef6c00" />

                <DashboardItem title={t("canceledAppointments")} value={`${canceledAppointments.length}`} icon={<AssignmentLate sx={{ color: "#4e342e" }} />} valueColor="#4e342e" />

                <Grid item xs={12}>
                    <Box my={2}>
                        <Divider textAlign="center">
                            <Typography variant="h6">{t("statistics")}</Typography>
                        </Divider>
                    </Box>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StyledBox m={1}>
                        <Bar data={barChartData} />
                    </StyledBox>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <StyledBox m={1}>
                        <Line data={lineChartData} options={lineBarOptions} />
                    </StyledBox>
                </Grid>
            </Grid>
        </>
    )
}

export default DashboardPersonal

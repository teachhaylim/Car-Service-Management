import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import DashboardItem from 'components/Overviews/DashboardItem';
import { FetchDashboardPersonal } from 'api/stats.api';

const DashboardPersonal = () => {
    const [canceledAppointments, setCanceledAppointments] = React.useState([]);
    const [pendingAppointments, setPendingAppointments] = React.useState([]);
    const [completedAppointments, setCompletedAppointments] = React.useState([]);
    const [numberOfServicesOffered, setNumberOfServicesOffered] = React.useState([]);
    const [totalAppointments, setTotalAppointments] = React.useState({});
    const [totalIncome, setTotalIncome] = React.useState({});

    //Chart
    const [numberOfAppointedService, setNumberOfAppointedServices] = React.useState([]); //chart
    const [numberOfServicesByUser, setNumberofServicesByUser] = React.useState([]); //chart

    useEffect(() => {
        FetchDashboardPersonal()
            .then(res => {
                if (res && res.meta == 200) {
                    const { canceledAppointments, completedAppointments, countOfAppointedServices, numberOfServicesByUser, numberOfServicesOffered, pendingAppointments, totalAppointments, totalIncome } = res.data;

                    setCanceledAppointments(canceledAppointments);
                    setCompletedAppointments(completedAppointments);
                    setPendingAppointments(pendingAppointments);
                    setNumberOfAppointedServices(countOfAppointedServices);
                    setNumberofServicesByUser(numberOfServicesByUser);
                    setNumberOfServicesOffered(numberOfServicesOffered);
                    setTotalAppointments(totalAppointments);
                    setTotalIncome(totalIncome);

                    console.log(res.data);

                    return;
                }

                toast.error(res.message);
            })
            .catch(err => {
                toast.error(err.message);
            })
    }, []);

    return (
        <>
            <Grid item container>
                <Grid item xs={12}>
                    <Box>
                        Dashboard Personal
                    </Box>
                </Grid>

                <DashboardItem title="Total Income" value={`$ ${totalIncome.total || 0}`} valueColor="#ff1744" iconColor="" icon="" />

                <DashboardItem title="Total Appointments" value={`${totalAppointments.total || 0}`} valueColor="#d500f9" iconColor="" icon="" />

                <DashboardItem title="Total Sevices" value={`${numberOfServicesOffered.length}`} valueColor="#2979ff" iconColor="" icon="" />

                <DashboardItem title="Pending Appointments" value={`${pendingAppointments.length}`} valueColor="#00e676" iconColor="" icon="" />

                <DashboardItem title="Completed Appointments" value={`${completedAppointments.length}`} valueColor="#3e2723" iconColor="" icon="" />

                <DashboardItem title="Canceled Appointments" value={`${canceledAppointments.length}`} valueColor="#1de9b6" iconColor="" icon="" />
            </Grid>
        </>
    )
}

export default DashboardPersonal

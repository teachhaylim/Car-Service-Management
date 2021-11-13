import { Search } from '@mui/icons-material'
import { Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { UpdateAppointment } from 'api/appointment.api'
import { QueryAppointment } from 'api/appointment.api'
import { AppointmentTable } from 'components/Appointment'
import { ConfirmDialog } from 'components/CustomComponents/ConfirmDialog'
import { SearchInput } from 'components/CustomComponents/SearchInput'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { shallowEqual, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const AppointmentIndex = () => {
    const { t } = useTranslation();
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const role = useSelector(store => store.role, shallowEqual);
    const shopInfo = useSelector(store => store.shop, shallowEqual);
    const [filter, setFilter] = useState({ limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [confirmObject, setConfirmObject] = useState({});

    //unused
    // const handleAddAppointment = () => {
    //     const state = {
    //         object: {},
    //         isEdit: false,
    //     };

    //     navigate("edit", { state });
    // };

    const handleEdit = (value) => {
        const state = {
            object: value,
            isEdit: true,
        }

        navigate("edit", { state });
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    }

    const FetchData = () => {
        if (role === 1) filter.sellCompany = shopInfo.id;

        QueryAppointment(filter)
            .then(res => {
                if (res.meta === 200) {
                    setData(res.results);
                    setFilter({ limit: res.limit, page: res.page, sortBy: filter.sortBy });
                    setTableFilter({ totalPages: res.totalPages, totalResults: res.totalResults });
                    setIsLoading(false);
                }
            })
            .catch(err => {
                toast.error(err.message);
                setIsLoading(false);
            });
    };

    const handleChangePage = (event, newPage) => {
        setFilter({ ...filter, page: newPage });
        setIsLoading(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setFilter({ ...filter, page: 0, limit: parseInt(event.target.value, 10) });
        setIsLoading(true);
    };

    const handleSearch = (value) => {
        if (["Pending", "pending", "Completed", "completed", "Canceled", "canceled"].includes(value)) {
            switch (value) {
                case "Pending":
                case "pending":
                    filter.statusType = 1;
                    break;
                case "Completed":
                case "completed":
                    filter.statusType = 2;
                    break;
                case "Canceled":
                case "canceled":
                    filter.statusType = 0;
                    break;
                default:
                    break;
            }
        }
        else {
            delete filter.statusType;
        }

        setFilter({ ...filter, page: 0, user: value });

        console.log(`filter`, filter)
    };

    const handleDelete = (value) => {
        setIsDelete(true);
        setConfirmObject(value);
    };

    const handleDeleteConfirm = (value) => {
        setIsDelete(false);
        console.log(value);
    }

    const handleComplete = (value) => {
        setIsComplete(true);
        setConfirmObject(value);
    };

    const handleCompleteConfirm = (value) => {
        setIsComplete(false);
        updateStauts(value, 2);
    };

    const handleCancel = (value) => {
        setIsCancel(true);
        setConfirmObject(value);
    };

    const handleCancelConfirm = (value) => {
        setIsCancel(false);
        updateStauts(value, 0);
    };

    const updateStauts = (value, type) => {
        const temp = JSON.parse(JSON.stringify(value));
        temp.status.unshift({ type: type, date: new Date() });
        temp.userId = temp.userId.id;
        temp.sellCompany = temp.sellCompany.id;
        temp.services = temp.services.map(item => {
            return {
                id: item.id,
                date: item.date,
                service: item.service.id,
            };
        });

        UpdateAppointment(temp.id, temp)
            .then(res => {
                if (res.meta === 200) {
                    data[data.indexOf(value)] = res.data;
                    setData([...data]);
                    toast.success("Appointment completed successfully");
                    return;
                };
            })
            .catch(err => {
                toast.error(t(`updateFailed - ${err.message}`));
            });
    };

    useEffect(
        () => {
            setTimeout(() => {
                FetchData();
            }, 1000);

            return () => {
                setData([]);
                setIsLoading(true);
            }
        },
        [filter.page, filter.limit]
    );

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Stack spacing={2}>
                            {showSearch ? <SearchInput title={t("searchAppointment")} func={handleSearch} /> : <Typography variant="h6"> {t("appointmentList")} </Typography>}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                {/* <Button variant="contained" startIcon={<Add />} onClick={handleAddAppointment}>{t("addBtn")}</Button> */}
                            </Stack>
                        </Grid>
                    </Grid>

                    <AppointmentTable
                        isLoading={isLoading}
                        filter={filter}
                        tableFilter={tableFilter}
                        data={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleComplete={handleComplete}
                        handleCancel={handleCancel}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>

            {/* //Backlog delete feature */}
            <ConfirmDialog
                bodyText={`${t("confirmDeletePlaceholder")} this appointment`}
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                onConfirm={handleDeleteConfirm}
                object={confirmObject}
            />

            <ConfirmDialog
                headerText="Confirm Complete"
                bodyText={`${t("confirmCompletePlaceholder")}  this appointment`}
                isOpen={isComplete}
                onClose={() => setIsComplete(false)}
                onConfirm={handleCompleteConfirm}
                object={confirmObject}
            />

            <ConfirmDialog
                headerText="Confirm Cancel"
                bodyText={`${t("confirmCancelPlaceholder")}  this appointment`}
                isOpen={isCancel}
                onClose={() => setIsCancel(false)}
                onConfirm={handleCancelConfirm}
                object={confirmObject}
            />
        </>
    )
}

export default AppointmentIndex

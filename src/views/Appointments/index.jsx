import { Add, Search } from '@mui/icons-material'
import { Button, Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { QueryAppointment } from 'api/appointment.api'
import { AppointmentTable } from 'components/Appointment'
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
    const [deleteObject, setDeleteObject] = useState({});

    const handleAddAppointment = () => {
        const object = {
            object: {},
            isEdit: false,
        };

        navigate("edit", { state: object });
    };

    const handleEdit = (value) => {
        const state = {
            object: value,
            isEdit: true,
        }

        navigate("edit", { state });
    };

    const handleDelete = (value) => {
        setIsDelete(true);
        setDeleteObject(value);
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    }

    const FetchData = () => {
        // if (role === 1) filter.sellCompany = shopInfo.id;

        QueryAppointment(filter)
            .then(res => {
                console.log(res)

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
                console.log(err);
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
        console.log(value);
    };

    const handleDeleteConfirm = (value) => {
        // DeleteService(value.id)
        //     .then(res => {
        //         if (res.meta === 200) {
        //             setIsDelete(false);
        //             FetchData();

        //             return toast.success("Service deleted successfully");
        //         }
        //     })
        //     .catch(err => {
        //         setIsDelete(false);
        //         console.log(err);
        //         toast.error(err.message);
        //     })
    }

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
                            {showSearch ? <SearchInput title={"Search appointment"} func={handleSearch} /> : <Typography variant="h6"> {t("appointmentList")} </Typography>}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                <Button variant="contained" startIcon={<Add />} onClick={handleAddAppointment}>{t("addBtn")}</Button>
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
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
        </>
    )
}

export default AppointmentIndex

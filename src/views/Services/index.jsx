import { Add, Search } from '@mui/icons-material'
import { Button, Card, CardContent, Grid, IconButton, Stack, Typography } from '@mui/material'
import { QueryService } from 'api/service.api'
import { SearchInput } from 'components/CustomComponents/SearchInput'
import { ServiceTable } from 'components/Services'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';

const ServiceIndex = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteObject, setDeleteObject] = useState({});

    const FetchData = () => {
        QueryService(filter)
            .then(res => {
                if (res.meta === 200) {
                    setData(res.results);
                    setFilter({ limit: res.limit, page: res.page, sortBy: filter.sortBy, name: filter.name });
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

    const handleFilterConfirm = (value) => {
        setFilter({ ...filter, sortBy: value });
    };

    const handleAddShop = () => {
        const state = {
            object: {},
            isEdit: false,
        }

        navigate("edit", { state });
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

    const handleSearch = () => {

    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    }

    const handleDeleteConfirm = (value) => {
        // DeleteCategory(value.id)
        //     .then(res => {
        //         if (res.meta === 200) {
        //             setIsDelete(false);
        //             FetchData();

        //             return toast.success("Category deleted successfully");
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
        [filter.page, filter.limit, filter.sortBy, filter.name]
    );

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Stack spacing={2}>
                            {showSearch ? <SearchInput title={"Search service"} func={handleSearch} /> : <Typography variant="h6"> {t("serviceList")} </Typography>}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                <Button variant="contained" startIcon={<Add />} onClick={handleAddShop}> {t("addBtn")} </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <ServiceTable
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

export default ServiceIndex

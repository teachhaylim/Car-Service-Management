// eslint-disable-next-line
import { IconButton, TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material';
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
// eslint-disable-next-line
import { toast } from 'react-toastify';
// eslint-disable-next-line
import { Add, Search, Delete, Edit } from '@mui/icons-material';
import { ConfirmDialog } from 'components/CustomComponents/ConfirmDialog';
import { SearchInput } from 'components/CustomComponents/SearchInput';
import { ShopTable } from 'components/Shop';
import { QueryShop } from 'api/shop.api';

const ShopIndex = () => {
    // eslint-disable-next-line
    const [data, setData] = useState([]);
    // eslint-disable-next-line
    const [filter, setFilter] = useState({ name: "", limit: 10, page: 0, sortBy: {} });
    // eslint-disable-next-line
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteObject, setDeleteObject] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    // eslint-disable-next-line
    const FetchData = () => {
        QueryShop()
            .then(res => {
                if (res.meta === 200) {
                    setData(res.results);
                    setFilter({ limit: res.limit, page: res.page, sortBy: filter.sortBy, name: filter.name });
                    setTableFilter({ totalPages: res.totalPages, totalResults: res.totalResults });
                    setIsLoading(false);
                }
            })
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

    const handleChangePage = (event, newPage) => {
        setFilter({ ...filter, page: newPage });
        setIsLoading(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setFilter({ ...filter, page: 0, limit: parseInt(event.target.value, 10) });
        setIsLoading(true);
    };

    // eslint-disable-next-line
    const handleFilterConfirm = (value) => {
        setFilter({ ...filter, sortBy: value });
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleAddShop = () => {
        const state = {
            object: {},
            isEdit: false,
        }

        navigate("edit", { state });
    };

    const handleSearch = (value) => {
        setFilter({ ...filter, name: value });
    };

    const handleDeleteConfirm = (value) => {
        console.log(value)
    };

    useEffect(() => {
        FetchData();

    }, []);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Stack spacing={2}>
                            {showSearch ? <SearchInput title={"Search shop name"} func={handleSearch} /> : <Typography variant="h6"> {t("shopList")} </Typography>}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                {/* <FilterCategory handleFilter={handleFilterConfirm} /> */}

                                <Button variant="contained" startIcon={<Add />} onClick={handleAddShop}> {t("addBtn")} </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <ShopTable
                        isLoading={isLoading}
                        filter={filter}
                        tableFilter={tableFilter}
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onPageChange={handleChangePage}
                        onRowPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>

            <ConfirmDialog
                bodyText={`${t("confirmDeletePlaceholder")} ${deleteObject.headerName}`}
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                onConfirm={handleDeleteConfirm}
                object={deleteObject}
            />
        </>
    )
}

export default ShopIndex;
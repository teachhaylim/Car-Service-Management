import { IconButton, TableContainer, Table, TableCell, TableBody, TableHead, TableRow, Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Add, Search, Delete, Edit } from '@mui/icons-material';
import { DeleteDialog } from 'components/CustomComponents/DeleteDialog';
import { SearchInput } from 'components/CustomComponents/SearchInput';
import { ShopTable } from 'components/Shop';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'logo', headerName: 'logo', width: 150 },
    { field: 'shopName', headerName: 'shopName', width: 150 },
    { field: 'isActive', headerName: 'isActive', width: 80 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

const ShopIndex = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ name: "", limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteObject, setDeleteObject] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    const FetchData = () => {

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
    }

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
                        data={header}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onPageChange={handleChangePage}
                        onRowPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>

            <DeleteDialog
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
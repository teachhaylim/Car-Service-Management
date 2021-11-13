import { IconButton, Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Add, Search } from '@mui/icons-material';
import { ConfirmDialog } from 'components/CustomComponents/ConfirmDialog';
import { SearchInput } from 'components/CustomComponents/SearchInput';
import { ShopTable } from 'components/Shop';
import { QueryShop } from 'api/shop.api';
import { UpdateShop } from 'api/shop.api';
import { toast } from 'react-toastify';

//TODO search
const ShopIndex = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ name: "", limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isStatusChange, setIsStatusChange] = useState(false);
    const [tempObject, setTempObject] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const handleSearch = (value) => {
        setFilter({ ...filter, name: value });
    };

    const handleDelete = (value) => {
        setIsDelete(true);
        setTempObject(value);
    };

    const handleDeleteConfirm = (value) => {
        console.log(value)
    };

    const handleStatusChange = (value) => {
        setIsStatusChange(true);
        setTempObject(value);
    };

    const handleStatusChangeConfirm = (value) => {
        setIsStatusChange(false);

        value.isActive = !value.isActive;

        UpdateShop(value.id, value)
            .then(res => {
                if (res.meta === 200) {
                    data[data.indexOf(value)].isActive = value.isActive;
                    setData([...data]);
                    toast.success(t("updateSuccess"))
                }
            })
            .catch(err => {
                toast.error(t(`updateFailed - ${err.message}`));
            });
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
                            {showSearch ? <SearchInput title={t("searchShop")} func={handleSearch} /> : <Typography variant="h6"> {t("shopList")} </Typography>}
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
                        onStatusChange={handleStatusChange}
                        onPageChange={handleChangePage}
                        onRowPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>

            {/* //Backlog delete feature */}
            <ConfirmDialog
                bodyText={`${t("confirmDeletePlaceholder")} ${tempObject.headerName}`}
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                onConfirm={handleDeleteConfirm}
                object={tempObject}
            />

            <ConfirmDialog
                headerText={t("confirmStatusChange")}
                bodyText={`${t("confirmStatusChangePlaceholder")}`}
                isOpen={isStatusChange}
                onClose={() => setIsStatusChange(false)}
                onConfirm={handleStatusChangeConfirm}
                object={tempObject}
            />
        </>
    )
}

export default ShopIndex;
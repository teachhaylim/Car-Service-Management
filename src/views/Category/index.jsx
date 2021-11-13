import { Add, Search } from '@mui/icons-material';
import { IconButton, Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material';
import { DeleteCategory, QueryCategory } from 'api/category.api';
import { CategoryTable, FilterCategory } from 'components/Category';
import { ConfirmDialog } from 'components/CustomComponents/ConfirmDialog';
import { SearchInput } from 'components/CustomComponents/SearchInput';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

//FIXME delete problem
const CategoriesIndex = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ name: "", limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [deleteObject, setDeleteObject] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const FetchData = () => {
        QueryCategory(filter)
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
            });
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

    const handleAddCategory = () => {
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
        DeleteCategory(value.id)
            .then(res => {
                if (res.meta === 200) {
                    setIsDelete(false);
                    FetchData();

                    return toast.success("Category deleted successfully");
                }
            })
            .catch(err => {
                setIsDelete(false);
                toast.error(t(`deleteFailed - ${err.message}`));
            })
    }

    useEffect(() => {
        FetchData();

        return () => {
            setData([]);
            setIsLoading(true);
        }
    }, [filter.page, filter.limit, filter.sortBy, filter.name]);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Stack spacing={2}>
                            {showSearch ? <SearchInput title={t("searchCategory")} func={handleSearch} /> : <Typography variant="h6"> {t("categoryList")} </Typography>}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                <FilterCategory handleFilter={handleFilterConfirm} />

                                <Button variant="contained" startIcon={<Add />} onClick={handleAddCategory}> {t("addBtn")} </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <CategoryTable
                        isLoading={isLoading}
                        filter={filter}
                        tableFilter={tableFilter}
                        datas={data}
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>

            <ConfirmDialog
                bodyText={`${t("confirmDeletePlaceholder")} ${deleteObject.name}`}
                isOpen={isDelete}
                onClose={() => setIsDelete(false)}
                onConfirm={handleDeleteConfirm}
                object={deleteObject}
            />
        </>
    )
}

export default CategoriesIndex
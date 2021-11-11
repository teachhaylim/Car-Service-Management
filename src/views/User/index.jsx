import React, { useEffect, useState } from 'react';
import { IconButton, Card, CardContent, Grid, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { QueryUsers } from 'api/user.api';
import { UserTable } from 'components/User';
import { ConfirmDialog } from 'components/CustomComponents/ConfirmDialog';
import { ResetPwdDialog } from 'components/User';
import { SearchInput } from 'components/CustomComponents/SearchInput';
import { Add, Search } from '@mui/icons-material';

//TODO search
const UserIndex = () => {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({ name: "", limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const [isStatusChange, setIsStatusChange] = useState(false);
    const [isResetPwd, setIsResetPwd] = useState(false);
    const [tempObject, setTempObject] = useState({});
    const navigate = useNavigate();
    const { t } = useTranslation();

    const FetchData = () => {
        QueryUsers()
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

    const handleResetPwd = (value) => {
        setTempObject(value);
        setIsResetPwd(true);
    };

    const handleStatusChange = (value) => {
        setIsStatusChange(true);
        setTempObject(value);
    };

    const handleConfirmStatusChange = () => {
        setIsStatusChange(false);
    };

    const handleChangePage = (event, newPage) => {
        setFilter({ ...filter, page: newPage });
        setIsLoading(true);
    };

    const handleChangeRowsPerPage = (event) => {
        setFilter({ ...filter, page: 0, limit: parseInt(event.target.value, 10) });
        setIsLoading(true);
    };

    const handleShowSearch = () => {
        setShowSearch(!showSearch);
    };

    const handleSearch = (value) => {
        setFilter({ ...filter, name: value });
    };

    useEffect(() => {
        FetchData();

    }, []);

    return (
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

                <UserTable
                    isLoading={isLoading}
                    filter={filter}
                    tableFilter={tableFilter}
                    data={data}
                    onEdit={handleEdit}
                    onResetPwd={handleResetPwd}
                    onStatusChange={handleStatusChange}
                    onPageChange={handleChangePage}
                    onRowPerPageChange={handleChangeRowsPerPage}
                />

                <ResetPwdDialog
                    headerText={t("changePwd")}
                    isOpen={isResetPwd}
                    onClose={() => setIsResetPwd(false)}
                    object={tempObject}
                />

                <ConfirmDialog
                    headerText={t("confirmActiveStatus")}
                    bodyText={`${t("confirmActiveStatusText")} ${tempObject.firstName} ${tempObject.lastName}`}
                    isOpen={isStatusChange}
                    onClose={() => setIsStatusChange(false)}
                    onConfirm={handleConfirmStatusChange}
                    object={tempObject}
                />
            </CardContent>
        </Card>
    )
}

export default UserIndex;
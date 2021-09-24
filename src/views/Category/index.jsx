import { Add, Search, Clear } from '@mui/icons-material';
import { IconButton, Card, CardContent, Grid, TextField, Button, Stack, Typography } from '@mui/material';
import { QueryCategory } from 'api/category.api';
import { CategoryTable } from 'components/Category';
import { FilterCategory } from 'components/Category';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

//TODO search
const CategoriesIndex = () => {
    const [datas, setDatas] = useState([]);
    const [filter, setFilter] = useState({ limit: 10, page: 0, sortBy: {} });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();

    const handleEdit = (value) => {
        console.log("Edit", value);
    };

    const handleDelete = (value) => {
        console.log("Delete", value);
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
        navigate("edit")
    }

    useEffect(
        () => {
            setTimeout(() => {
                QueryCategory(filter)
                    .then(res => {
                        if (res.meta === 200) {
                            setDatas(res.results);
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
            }, 1500);

            return () => {
                setDatas([]);
                setIsLoading(true);
            }
        },
        [filter.page, filter.limit, filter.sortBy]
    );

    const TextContent = () => (
        <TextField
            label="Search"
            size="small"
            InputProps={{
                endAdornment: <IconButton size="small" onClick={handleShowSearch}><Clear fontSize="small" /></IconButton>
            }}
            sx={{
                width: 500,
            }}
        />
    );

    const TextInput = () => (
        <Typography variant="h6">
            Category List
        </Typography>
    );

    return (
        <div>
            <Card>
                <CardContent>
                    <Grid item container justifyContent="space-between" alignItems="center">
                        <Stack spacing={2}>
                            {!showSearch ? <TextInput /> : <TextContent />}
                        </Stack>

                        <Grid item>
                            <Stack spacing={2} direction="row">
                                <IconButton color={showSearch ? "secondary" : "default"} onClick={handleShowSearch}>
                                    <Search />
                                </IconButton>

                                <FilterCategory handleFilter={handleFilterConfirm} />

                                <Button variant="contained" startIcon={<Add />} onClick={handleAddCategory}> Add </Button>
                            </Stack>
                        </Grid>
                    </Grid>

                    <CategoryTable isLoading={isLoading} filter={filter} tableFilter={tableFilter} datas={datas} handleEdit={handleEdit} handleDelete={handleDelete} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
                </CardContent>
            </Card>
        </div>
    )
}

export default CategoriesIndex
import { Delete, Edit } from '@mui/icons-material';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableBody, IconButton, Paper, TableFooter, TablePagination, LinearProgress } from '@mui/material';
import { QueryCategory } from 'api/category.api';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const columns = [
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'name', headerName: 'Category Name', width: 150 },
    { field: 'remark', headerName: 'Remark', width: 150 },
    { field: 'actions', headerName: 'Actions', width: 80 },
];

//TODO intergrade sort & filter
const CategoriesIndex = () => {
    //eslint-disable-next-line
    const [datas, setDatas] = useState([]);
    const [filter, setFilter] = useState({ limit: 10, sortBy: "name:desc", page: 0 });
    const [tableFilter, setTableFilter] = useState({ totalPages: 0, totalResults: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            setTimeout(() => {
                QueryCategory(filter)
                    .then(res => {
                        if (res.meta === 200) {
                            setDatas(res.results);
                            setFilter({ limit: res.limit, page: res.page, sortBy: "" });
                            setTableFilter({ totalPages: res.totalPages, totalResults: res.totalResults });
                            setIsLoading(false);
                        }
                    })
                    .catch(err => {
                        toast.error(err.message);
                        setIsLoading(false);
                        console.log(err);
                    })
            }, 3000);

            return () => {
                setDatas([]);
                setIsLoading(true);
            }
        },
        [filter.page, filter.limit]
    );

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

    const Loading = () => (
        <TableRow>
            <TableCell align="center" colSpan={4}>
                <LinearProgress />
            </TableCell>
        </TableRow>
    );

    const EmptyData = () => (
        <TableRow>
            <TableCell align="center" colSpan={4}>
                No data
            </TableCell>
        </TableRow>
    );

    return (
        <div>
            Categories Page

            <TableContainer component={Paper}>
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((item, key) => (
                                    <TableCell key={key} sx={{ width: item.width }}>{item.headerName}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            isLoading ? <Loading /> : !datas.length ? <EmptyData /> : datas.map((item, key) => (
                                <TableRow key={key} hover={true} >
                                    <TableCell>{key + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.remark}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEdit(item)} color="success"><Edit /></IconButton>
                                        <IconButton onClick={() => handleDelete(item)} color="error"><Delete /></IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[10, 20, 30]}
                                count={tableFilter.totalResults}
                                rowsPerPage={filter.limit}
                                page={filter.page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}

export default CategoriesIndex
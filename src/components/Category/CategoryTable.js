import { Delete, Edit } from '@mui/icons-material';
import { Skeleton, CircularProgress, TableContainer, TableHead, TableRow, Table, TableCell, TableBody, IconButton, TableFooter, TablePagination, LinearProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'name', headerName: 'categoryName', width: 150 },
    { field: 'remark', headerName: 'remark', width: 150 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

//TODO adjust column width
const CategoryTable = ({ isLoading, filter, tableFilter, datas, handleEdit, handleDelete, handleChangePage, handleChangeRowsPerPage }) => {
    const { t } = useTranslation();
    const LinearLoading = () => (
        <TableRow sx={{ height: 50 }}>
            <TableCell align="center" colSpan={4}>
                <LinearProgress />
            </TableCell>
        </TableRow>
    );

    // eslint-disable-next-line
    const CircularLoading = () => (
        <TableRow sx={{ height: 120 }}>
            <TableCell align="center" colSpan={4}>
                <CircularProgress />
            </TableCell>
        </TableRow>
    );

    // eslint-disable-next-line
    const SkeletonLoading = () => (
        <TableRow>
            <TableCell align="center" colSpan={4}>
                <Skeleton variant="rectangular" width={"100%"} height={118} animation="wave" />
            </TableCell>
        </TableRow>
    );

    const EmptyData = () => (
        <TableRow sx={{ height: 50 }}>
            <TableCell align="center" colSpan={4}>
                <Typography variant="subtitile1">
                    No data
                </Typography>
            </TableCell>
        </TableRow>
    );

    return (
        <Grid item mt={2}>
            <TableContainer >
                <Table size="small" >
                    <TableHead>
                        <TableRow>
                            {
                                header.map((item, key) => (
                                    <TableCell key={key} sx={{ width: item.width }}>{t(item.headerName)}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            isLoading ? <LinearLoading /> : !datas.length ? <EmptyData /> : datas.map((item, key) => (
                                <TableRow key={key} hover={true} >
                                    <TableCell>{filter.page * filter.limit + key + 1}</TableCell>
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
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    )
}

CategoryTable.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    filter: PropTypes.object.isRequired,
    tableFilter: PropTypes.object.isRequired,
    datas: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default CategoryTable;
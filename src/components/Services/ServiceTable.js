import { Delete, Edit } from '@mui/icons-material';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableBody, IconButton, TableFooter, TablePagination, Grid, Typography, Chip, Tooltip } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LinearTableLoading } from 'components/CustomComponents/LinearTableLoading';
import { displaySeeMore } from 'utils/generalFunc';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'name', headerName: 'serviceName', width: 150 },
    { field: 'price', headerName: 'price', width: 150 },
    { field: 'remark', headerName: 'remark', width: 150 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

//TODO adjust column width
const ServiceTable = ({ isLoading, filter, tableFilter, data, handleEdit, handleDelete, handleChangePage, handleChangeRowsPerPage }) => {
    const { t } = useTranslation();

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
                            isLoading ? <LinearTableLoading colSize={header.length} /> : !data.length ? <EmptyData /> : data.map((item, key) => (
                                <TableRow key={key} hover={true} >
                                    <TableCell>{filter.page * filter.limit + key + 1}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Chip color="primary" sx={{ fontWeight: "bold", fontSize: 14 }} label={`$ ${item.price}`} />
                                    </TableCell>
                                    <TableCell>{displaySeeMore(item.remark)}</TableCell>
                                    <TableCell>
                                        <Tooltip title={t("edit")} placement="top">
                                            <IconButton onClick={() => handleEdit(item)} color="success"><Edit /></IconButton>
                                        </Tooltip>
                                        <Tooltip title={t("delete")} placement="top">
                                            <IconButton onClick={() => handleDelete(item)} color="error"><Delete /></IconButton>
                                        </Tooltip>
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

ServiceTable.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    filter: PropTypes.object,
    tableFilter: PropTypes.object,
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default ServiceTable;
import { Cancel, Check, Delete, Edit, Visibility } from '@mui/icons-material';
import { TableContainer, TableHead, TableRow, Table, TableCell, TableBody, IconButton, TableFooter, TablePagination, Grid, Typography, Chip, Tooltip } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { LinearTableLoading } from 'components/CustomComponents/LinearTableLoading';
import { displayStatus } from 'utils/generalFunc';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'billTo', headerName: 'billTo', width: 150 },
    { field: 'totalPrice', headerName: 'Total Price', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

const AppointmentTable = ({ isLoading, filter, tableFilter, data, handleEdit, handleComplete, handleCancel, handleDelete, handleChangePage, handleChangeRowsPerPage }) => {
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
                                    <TableCell key={key} width={item.width}>{t(item.headerName)}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            isLoading ? <LinearTableLoading colSize={header.length} /> : !data.length ? <EmptyData /> : data.map((item, key) => (
                                <TableRow key={key} hover={true} >
                                    <TableCell>{filter.page * filter.limit + key + 1}</TableCell>
                                    <TableCell>{`${item.userId.firstName} ${item.userId.lastName}`}</TableCell>
                                    <TableCell>
                                        $ {
                                            item.services.reduce((total, item) => {
                                                return total + item.service.price;
                                            }, 0)
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Chip color={displayStatus(item.status[0].type).color} label={displayStatus(item.status[0].type).value} />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip Tooltip title={t("view")} placement="top" arrow>
                                            <IconButton onClick={() => handleEdit(item)} color="success"><Visibility /></IconButton>
                                        </Tooltip>

                                        {
                                            item.status[0].type === 1 ?
                                                <Tooltip Tooltip title={t("complete")} placement="top" arrow>
                                                    <IconButton onClick={() => handleComplete(item)} color="success"><Check /></IconButton>
                                                </Tooltip> : null
                                        }

                                        {
                                            item.status[0].type === 1 ?
                                                <Tooltip title={t("cancel")} placement="top" arrow>
                                                    <IconButton onClick={() => handleCancel(item)} color="error"><Cancel /></IconButton>
                                                </Tooltip> : null
                                        }

                                        <Tooltip title={t("delete")} placement="top" arrow>
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
        </Grid >
    )
}

AppointmentTable.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    filter: PropTypes.object,
    tableFilter: PropTypes.object,
    data: PropTypes.array.isRequired,
    handleEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleChangePage: PropTypes.func.isRequired,
    handleChangeRowsPerPage: PropTypes.func.isRequired,
};

export default AppointmentTable;
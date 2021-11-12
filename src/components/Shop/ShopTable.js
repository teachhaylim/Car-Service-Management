import { IconButton, TableContainer, TablePagination, TableFooter, Table, TableCell, TableBody, TableHead, TableRow, Grid, Avatar, Tooltip, Chip } from '@mui/material';
import React from 'react';
import { CenterFocusStrong, Edit } from '@mui/icons-material';
import { checkFile } from 'utils/generalFunc';
import { useTranslation } from 'react-i18next';
import LinearLoading from 'components/CustomComponents/LinearTableLoading/LinearTableLoading';
import { displaySeeMore } from 'utils/generalFunc';
import moment from 'moment';
import { EmptyData } from 'components/CustomComponents/EmptyData';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'logo', headerName: 'logo', width: 50 },
    { field: 'name', headerName: 'name', width: 100 },
    { field: 'description', headerName: 'description', width: 200 },
    { field: 'createdAt', headerName: 'createdAt', width: 150 },
    { field: 'isActive', headerName: 'isActive', width: 50 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

const ShopTable = ({ isLoading, data, onStatusChange, onEdit, onDelete, onPageChange, onRowPerPageChange, tableFilter, filter }) => {
    const { t } = useTranslation();

    return (
        <Grid item sx={{ mt: 1 }}>
            <TableContainer>
                <Table>
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
                            isLoading ? <LinearLoading colSize={header.length} /> : !data.length ? <EmptyData colSize={header.length} /> : data.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell>{filter.page * filter.limit + key + 1}</TableCell>

                                    <TableCell>
                                        <Avatar src={item.logo ? checkFile(item.logo) : ""} sx={{ width: 64, height: 64 }} variant="rounded" />
                                    </TableCell>

                                    <TableCell>{item.name}</TableCell>

                                    <TableCell>{displaySeeMore(item.description)}</TableCell>

                                    <TableCell>{moment(item.createdAt).format("DD / MMMM / YYYY")}</TableCell>

                                    <TableCell>
                                        <Chip label={item.isActive ? t("active") : t("inactive")} color={item.isActive ? "primary" : "error"} />
                                    </TableCell>

                                    <TableCell>
                                        <Tooltip title={t("changeStatus")} placement="top">
                                            <IconButton onClick={() => onStatusChange(item)} color="success"><CenterFocusStrong /></IconButton>
                                        </Tooltip>

                                        <Tooltip title={t("edit")} placement="top">
                                            <IconButton onClick={() => onEdit(item)} color="info"><Edit /></IconButton>
                                        </Tooltip>

                                        {/* <Tooltip title={t("delete")} placement="top">
                                            <IconButton onClick={() => onDelete(item)} color="error"><Delete /></IconButton>
                                        </Tooltip> */}
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
                                onPageChange={onPageChange}
                                onRowsPerPageChange={onRowPerPageChange}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default ShopTable;

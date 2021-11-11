import { IconButton, TableContainer, TablePagination, TableFooter, Table, TableCell, TableBody, TableHead, TableRow, Grid, Avatar, Tooltip, Chip } from '@mui/material';
import React from 'react';
import { CenterFocusStrong, Delete, Edit, Password } from '@mui/icons-material';
import { checkFile } from 'utils/generalFunc';
import { useTranslation } from 'react-i18next';
import LinearLoading from 'components/CustomComponents/LinearTableLoading/LinearTableLoading';
import { displaySeeMore } from 'utils/generalFunc';
import moment from 'moment';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'logo', headerName: 'logo', width: 50 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'dob', headerName: 'dob', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
    { field: 'phoneNumber', headerName: 'phoneNumber', width: 150 },
    { field: 'accountType', headerName: 'accountType', width: 50 },
    { field: 'isActive', headerName: 'isActive', width: 50 },
    { field: 'createdAt', headerName: 'createdAt', width: 150 },
    { field: 'actions', headerName: 'actions', width: 150 },
];

const UserTable = ({ isLoading, data, onStatusChange, onEdit, onResetPwd, onPageChange, onRowPerPageChange, tableFilter, filter }) => {
    const { t } = useTranslation();

    const displayAccountType = (type) => {
        switch (type) {
            case -1:
                return { title: t('user'), color: 'success' };
            case 1:
                return { title: t('admin'), color: 'warning' };
            case 2:
                return { title: t('superAdmin'), color: 'info' };
            default:
                return { title: t('unknown'), color: 'default' };
        }
    };

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
                            isLoading ? <LinearLoading colSize={header.length} /> : data.map((item, key) => (
                                <TableRow key={key}>
                                    <TableCell>{filter.page * filter.limit + key + 1}</TableCell>

                                    <TableCell>
                                        <Avatar src={checkFile(item.profilePic)} sx={{ width: 64, height: 64 }} variant="rounded" />
                                    </TableCell>

                                    <TableCell>{`${item.firstName} ${item.lastName}`}</TableCell>

                                    <TableCell>{moment(item.dob).format("DD / MMMM / YYYY")}</TableCell>

                                    <TableCell>{item.email}</TableCell>

                                    <TableCell>{item.phoneNumber}</TableCell>

                                    <TableCell>
                                        <Chip label={displayAccountType(item.type).title} color={displayAccountType(item.type).color} />
                                    </TableCell>

                                    <TableCell>
                                        <Chip label={item.isActive ? "Active" : "Inactive"} color={item.isActive ? "primary" : "error"} />
                                    </TableCell>

                                    <TableCell>{moment(item.createdAt).format("DD / MMMM / YYYY")}</TableCell>

                                    <TableCell>
                                        <Tooltip title={t("changeStatus")} placement="top">
                                            <IconButton onClick={() => onStatusChange(item)} color="success"><CenterFocusStrong /></IconButton>
                                        </Tooltip>

                                        <Tooltip title={t("changePwd")} placement="top">
                                            <IconButton onClick={() => onResetPwd(item)} color="warning"><Password /></IconButton>
                                        </Tooltip>

                                        <Tooltip title={t("edit")} placement="top">
                                            <IconButton onClick={() => onEdit(item)} color="info"><Edit /></IconButton>
                                        </Tooltip>
                                    </TableCell>

                                    {/* <TableCell>
                                        <Avatar src={item.logo ? checkFile(item.logo) : ""} sx={{ width: 64, height: 64 }} variant="rounded" />
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{displaySeeMore(item.description)}</TableCell>
                                    <TableCell>{moment(item.createdAt).format("DD / MMMM / YYYY")}</TableCell>
                                    <TableCell>
                                        <Chip label={item.isActive ? "Active" : "Inactive"} color={item.isActive ? "primary" : "error"} />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={t("changeStatus")} placement="top">
                                            <IconButton onClick={() => onStatusChange(item)} color="success"><CenterFocusStrong /></IconButton>
                                        </Tooltip>

                                        <Tooltip title={t("edit")} placement="top">
                                            <IconButton onClick={() => onEdit(item)} color="success"><Edit /></IconButton>
                                        </Tooltip>

                                        <Tooltip title={t("delete")} placement="top">
                                            <IconButton onClick={() => onDelete(item)} color="error"><Delete /></IconButton>
                                        </Tooltip>
                                    </TableCell> */}
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

export default UserTable;

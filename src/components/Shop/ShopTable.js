import { IconButton, TableContainer, TablePagination, TableFooter, Table, TableCell, TableBody, TableHead, TableRow, Grid } from '@mui/material';
import React from 'react';
import { Delete, Edit } from '@mui/icons-material';

const header = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'logo', headerName: 'logo', width: 150 },
    { field: 'shopName', headerName: 'shopName', width: 150 },
    { field: 'isActive', headerName: 'isActive', width: 80 },
    { field: 'actions', headerName: 'actions', width: 80 },
];

const ShopTable = ({ isLoading, data, onEdit, onDelete, onPageChange, onRowPerPageChange, tableFilter, filter }) => {
    return (
        <Grid item sx={{ mt: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                header.map((item, key) => (
                                    <TableCell key={key}>{item.headerName}</TableCell>
                                ))
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data.map((item, key) => (
                                <TableRow>
                                    <TableCell key={key}>{item.headerName}</TableCell>
                                    <TableCell key={key}>{item.headerName}</TableCell>
                                    <TableCell key={key}>{item.headerName}</TableCell>
                                    <TableCell key={key}>{item.headerName}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => onEdit(item)} color="success"><Edit /></IconButton>
                                        <IconButton onClick={() => onDelete(item)} color="error"><Delete /></IconButton>
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

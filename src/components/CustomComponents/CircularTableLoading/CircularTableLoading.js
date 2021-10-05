import { CircularProgress, TableRow, TableCell } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const CircularTableLoading = ({ colSize }) => (
    <TableRow sx={{ height: 120 }}>
        <TableCell align="center" colSpan={colSize}>
            <CircularProgress />
        </TableCell>
    </TableRow>
);

CircularTableLoading.propTypes = {
    colSize: PropTypes.number.isRequired,
}

export default CircularTableLoading;
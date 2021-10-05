import { TableRow, TableCell, LinearProgress } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const LinearLoading = ({ colSize }) => (
    <TableRow sx={{ height: 50 }}>
        <TableCell align="center" colSpan={colSize}>
            <LinearProgress />
        </TableCell>
    </TableRow>
);

LinearLoading.propTypes = {
    colSize: PropTypes.number.isRequired,
}

export default LinearLoading;
import { TableRow, TableCell, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const EmptyData = ({ colSize }) => {
    const { t } = useTranslation();

    return (
        <TableRow sx={{ height: 50 }}>
            <TableCell align="center" colSpan={colSize}>
                <Typography variant="subtitile1">
                    {t("emptyData")}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

EmptyData.propTypes = {
    colSize: PropTypes.number.isRequired,
}

export default EmptyData;
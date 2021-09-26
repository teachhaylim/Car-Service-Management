import { Cancel, CheckCircle, Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';

const CustomDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2, display: "flex", alignItems: "center" }} {...other}>
            {children}
            {!onClose || <IconButton
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: "red",
                    // "&:hover": {
                    //     backgroundColor: "red",
                    //     transition: "0.6s all",
                    //     color: "white",
                    // }
                }}
            >
                <Close />
            </IconButton>}
        </DialogTitle>
    );
};

CustomDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
};

const DeleteDialog = (props) => {
    const { isOpen, onClose, onConfirm, bodyText, headerText, object } = props;
    const { t } = useTranslation();

    const handleConfirm = () => {
        onConfirm(object);
    }

    return (
        <Dialog
            open={isOpen}
            fullWidth={true}
        >
            <CustomDialogTitle onClose={onClose}>
                {headerText || t("confirmDelete")}
            </CustomDialogTitle>

            <DialogContent dividers>
                <Typography sx={{ fontSize: 18, fontWeight: 400 }} >
                    {bodyText || t("confirmDeleteText")}?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button startIcon={<CheckCircle />} variant="contained" onClick={handleConfirm}>{t("confirmBtn")}</Button>
                <Button startIcon={<Cancel />} variant="outlined" color="error" onClick={onClose}>{t("cancelBtn")}</Button>
            </DialogActions>
        </Dialog>
    )
};

DeleteDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    bodyText: PropTypes.string,
    headerText: PropTypes.string,
    object: PropTypes.object.isRequired
}

export default DeleteDialog;

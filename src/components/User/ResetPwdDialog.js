import { Cancel, CheckCircle, Close } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import PropTypes from "prop-types";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { ChangePassword } from 'api/auth.api';

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

const validateSchema = Yup.object({
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string().required("Confirm password is required").oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ResetPwdDialog = (props) => {
    const { isOpen, onClose, headerText, object } = props;
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            formik.resetForm();

            ChangePassword({ userId: object.id, newPassword: values.newPassword })
                .then(res => {
                    if (res.meta == 200) {
                        toast.success(res.message);
                        onClose();

                        return;
                    }
                })
                .catch(err => {
                    toast.success(err.message);
                })
        },
    });

    const handleOnClose = () => {
        onClose();
        formik.resetForm();
    };

    return (
        <Dialog
            open={isOpen}
            fullWidth={true}
        >
            <CustomDialogTitle onClose={handleOnClose}>
                {headerText || t("confirmDialog")}
            </CustomDialogTitle>

            <DialogContent dividers>
                <Grid item xs={12}>
                    <FormLabel>New password</FormLabel>
                    <TextField
                        fullWidth
                        margin="dense"
                        size="small"
                        variant="outlined"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && t(formik.errors.newPassword)}
                    />
                </Grid>

                <Grid item xs={12} mt={1}>
                    <FormLabel>Confirm password</FormLabel>
                    <TextField
                        fullWidth
                        margin="dense"
                        size="small"
                        variant="outlined"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && t(formik.errors.confirmPassword)}
                    />
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button startIcon={<CheckCircle />} variant="contained" onClick={formik.handleSubmit}>{t("confirm")}</Button>
                <Button startIcon={<Cancel />} variant="outlined" color="error" onClick={handleOnClose}>{t("cancel")}</Button>
            </DialogActions>
        </Dialog>
    )
};


export default ResetPwdDialog;

import { Cancel, Edit, Save } from '@mui/icons-material';
import { DesktopDatePicker } from '@mui/lab';
import { Button, Divider, FormLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { uploadFile } from 'api/file.api';
import { UpdateUser } from 'api/user.api';
import { SingleFileUpload } from 'components/CustomComponents/SingleFileUpload';
import { getIn, useFormik } from 'formik';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SetUserInfo } from 'store';
import * as Yup from "yup";

const StyledPaper = styled(Paper)(({ theme }) => {
    return {
        borderRadius: 4,
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.15)",
        padding: 16,
        height: "100%",
        width: "100%",
    };
});

const validateSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    dob: Yup.string().required("Date of Birth is required"),
    email: Yup.string().required("Email is required"),
    profilePic: Yup.string(),
    address: Yup.object().shape({
        house: Yup.string().required("House is required"),
        street: Yup.string().required("Street is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        zipCode: Yup.string().required("Zipcode is required"),
    }),
});

const ProfileIndex = () => {
    const userInfo = useSelector(store => store.user, shallowEqual);
    const [imageFile, setImageFile] = useState(userInfo.profilePic || "");
    const [isEdit, setIsEdit] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            id: userInfo.id || "",
            firstName: userInfo.firstName || "",
            lastName: userInfo.lastName || "",
            phoneNumber: userInfo.phoneNumber || "",
            dob: userInfo.dob || "",
            email: userInfo.email || "",
            password: userInfo.password || "",
            profilePic: userInfo.profilePic || "",
            sellCompany: userInfo.sellCompany || {},
            type: userInfo.type || "", // 0 = user role (not allow access at all), 1 = admin (allow access to related info), 2 = superadmin (God level access xd)
            isActive: userInfo.isActive || true,
            address: {
                id: userInfo.address?.id || "",
                house: userInfo.address?.house || "",
                street: userInfo.address?.street || "",
                state: userInfo.address?.state || "",
                city: userInfo.address?.city || "",
                country: userInfo.address?.country || "",
                zipCode: userInfo.address?.zipCode || "",
            },
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            if (imageFile instanceof File) {
                await uploadFile(imageFile)
                    .then(res => {
                        if (res && res.meta === 201) {
                            values.profilePic = res.file.filename;
                        }
                    })
                    .catch(err => {
                        toast.error(err.message)
                    });
            }

            UpdateUser(userInfo.id, values)
                .then(res => {
                    if (res.meta === 200) {
                        dispatch(SetUserInfo(res.data));

                        toast.success("User updated")
                    }
                })
                .catch(err => {
                    toast.error(t(`updateFailed - ${err.message}`));
                })
        },
    });

    const handleClick = () => {
        if (isEdit) {
            formik.handleSubmit();
            setIsEdit(false)
            return;
        }

        formik.resetForm();
        setIsEdit(true);
    };

    return (
        <>
            <Grid sx={{ mt: 0 }} item container spacing={2}>
                <Grid item height="100%" xs={12} sm={6} md={5} lg={4} xl={3}>
                    <StyledPaper elevation={0}>
                        <SingleFileUpload file={imageFile} onChange={(value) => setImageFile(value)} isEdit={!isEdit} />
                    </StyledPaper>
                </Grid>

                <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
                    <StyledPaper elevation={0}>
                        <Divider textAlign="left">
                            <Typography variant="h6">
                                {t("personalProfile")}
                            </Typography>
                        </Divider>

                        <Grid item container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <FormLabel>{t("firstName")}</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="firstName"
                                    placeholder={t("firstName")}
                                    disabled={!isEdit}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && t(formik.errors.firstName)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <FormLabel>{t("lastName")}</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="lastName"
                                    placeholder={t("lastName")}
                                    disabled={!isEdit}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && t(formik.errors.lastName)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <FormLabel>{t("phoneNumber")}</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="phoneNumber"
                                    placeholder={t("phoneNumber")}
                                    disabled={!isEdit}
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && t(formik.errors.phoneNumber)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <FormLabel>{t("email")}</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    name="email"
                                    placeholder={t("email")}
                                    disabled={!isEdit}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && t(formik.errors.email)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={4}>
                                <FormLabel>{t("dob")}</FormLabel>
                                <DesktopDatePicker
                                    name="dob"
                                    disableCloseOnSelect
                                    disabled={!isEdit}
                                    value={formik.values.dob}
                                    onChange={(e) => { formik.setFieldValue("dob", e) }}
                                    renderInput={(params) => <TextField {...params} />}
                                    error={formik.touched.dob && Boolean(formik.errors.dob)}
                                    helperText={formik.touched.dob && t(formik.errors.dob)}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ mt: 2, mb: 1 }} textAlign="left">
                            <Typography variant="h6">
                                {t("personalAddress")}
                            </Typography>
                        </Divider>

                        <Grid item xs={12}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("house")}</FormLabel>
                                    <TextField
                                        rows={8}
                                        fullWidth
                                        name="address.house"
                                        placeholder={t("house")}
                                        disabled={!isEdit}
                                        value={formik.values.address.house}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.house') && Boolean(getIn(formik.errors, 'address.house'))}
                                        helperText={getIn(formik.touched, 'address.house') && getIn(formik.errors, 'address.house')}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("street")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        name="address.street"
                                        placeholder={t("street")}
                                        disabled={!isEdit}
                                        value={formik.values.address.street}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.street') && Boolean(getIn(formik.errors, 'address.street'))}
                                        helperText={getIn(formik.touched, 'address.street') && getIn(formik.errors, 'address.street')}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("state")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        name="address.state"
                                        placeholder={t("state")}
                                        disabled={!isEdit}
                                        value={formik.values.address.state}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.state') && Boolean(getIn(formik.errors, 'address.state'))}
                                        helperText={getIn(formik.touched, 'address.state') && getIn(formik.errors, 'address.state')}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("city")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        name="address.city"
                                        placeholder={t("city")}
                                        disabled={!isEdit}
                                        value={formik.values.address.city}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.city') && Boolean(getIn(formik.errors, 'address.city'))}
                                        helperText={getIn(formik.touched, 'address.city') && getIn(formik.errors, 'address.city')}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("country")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        name="address.country"
                                        placeholder={t("country")}
                                        disabled={!isEdit}
                                        value={formik.values.address.country}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.country') && Boolean(getIn(formik.errors, 'address.country'))}
                                        helperText={getIn(formik.touched, 'address.country') && getIn(formik.errors, 'address.country')}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={4}>
                                    <FormLabel>{t("zipCode")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        name="address.zipCode"
                                        placeholder={t("zipCode")}
                                        disabled={!isEdit}
                                        value={formik.values.address.zipCode}
                                        onChange={formik.handleChange}
                                        error={getIn(formik.touched, 'address.zipCode') && Boolean(getIn(formik.errors, 'address.zipCode'))}
                                        helperText={getIn(formik.touched, 'address.zipCode') && getIn(formik.errors, 'address.zipCode')}
                                    />
                                </Grid>
                            </Grid>

                            <Grid item container justifyContent="end" alignItems="end" mt={2} xs={12}>
                                {
                                    isEdit && <Button startIcon={<Cancel />} sx={{ mr: 2 }} variant="outlined" color="error" onClick={() => setIsEdit(false)}>{t("cancel")}</Button>
                                }

                                <Button startIcon={isEdit ? <Save /> : <Edit />} variant="outlined" onClick={handleClick}>{isEdit ? t("saveBtn") : t("edit")}</Button>
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </Grid>
        </>
    )
}

export default ProfileIndex;
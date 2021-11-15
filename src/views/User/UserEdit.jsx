import { Close, Save } from '@mui/icons-material';
import { Select, Button, Card, CardActions, CardContent, Divider, FormLabel, Grid, Paper, TextField, Typography, MenuItem, FormHelperText } from '@mui/material';
import { styled } from '@mui/styles';
import { DesktopDatePicker } from '@mui/lab';
import { uploadFile } from 'api/file.api';
import { SingleFileUpload } from 'components/CustomComponents/SingleFileUpload';
import { getIn, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { CreateUser } from 'api/user.api';
import moment from 'moment';
import { UpdateUser } from 'api/user.api';
import { QueryShop } from 'api/shop.api';

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
    address: Yup.object().shape({
        house: Yup.string().required("House is required"),
        street: Yup.string().required("Street is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        zipCode: Yup.string().required("Zipcode is required"),
    }),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    dob: Yup.date().required("Date of birth is required"),
    email: Yup.string().required("Email is required"),
    profilePic: Yup.string(),
    type: Yup.number().required("Type is required"),
    sellCompany: Yup.string().when('type', {
        is: (type) => {
            if (type === 1) return true;
        },
        then: Yup.string().required('Shop is required').nullable(),
        otherwise: Yup.string().nullable(),
    }),
});

const UserEdit = () => {
    const user = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;
    const [imageFile, setImageFile] = useState(user.profilePic || {});
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [shops, setShops] = useState([]);
    const formik = useFormik({
        initialValues: {
            id: user.id || "",
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            phoneNumber: user.phoneNumber || "",
            dob: user.dob || moment().toDate(),
            email: user.email || "",
            profilePic: user.profilePic || "",
            type: user.type || "", // 0 = user role (not allow access at all), 1 = admin (allow access to related info), 2 = superadmin (God level access xd)
            address: {
                id: user.address?.id || "",
                house: user.address?.house || "",
                street: user.address?.street || "",
                state: user.address?.state || "",
                city: user.address?.city || "",
                country: user.address?.country || "",
                zipCode: user.address?.zipCode || "",
            },
            sellCompany: user?.sellCompany?.id || null,
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            switch (values.type) {
                // case 1:
                //     if (value == null) {
                //         return;
                //         // return toast.warning("Shop is required");
                //     }
                //     values.sellCompany = value;
                //     break;
                case -1:
                    values.sellCompany = null;
                    break;
                case 2:
                    values.sellCompany = null;
                    break;
                // default:
                //     return;
            }

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

            if (isEdit) {
                UpdateUser(values.id, values)
                    .then(res => {
                        if (res && res.meta === 200) {
                            return toast.success(t("updateSuccess"));
                        }

                        toast.success(t("updateFailed"));
                    })
                    .catch(err => {
                        toast.error(t(`updateFailed - ${err.message}`));
                    })
                    .finally(() => {
                        navigate("/app/users");
                        formik.resetForm();
                    })

                return;
            }

            CreateUser(values)
                .then(res => {
                    if (res && res.meta === 201) {
                        return toast.success(t("createSuccess"));
                    }

                    toast.success(t("createFailed"));
                })
                .catch(err => {
                    toast.error(t(`createFailed - ${err.message}`));
                })
                .finally(() => {
                    navigate("/app/users");
                    formik.resetForm();
                })
        },
    });

    const handleFileChange = (value) => {
        setImageFile(value);
    };

    useEffect(() => {
        QueryShop()
            .then(res => {
                if (res && res.meta === 200) {
                    setShops([...res.results]);
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    }, []);

    return (
        <Card>
            <CardContent>
                <Divider textAlign="left">
                    <Typography variant="h6">
                        {t("userInfo")}
                    </Typography>
                </Divider>

                <Grid sx={{ mt: 0 }} item container spacing={2}>
                    <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
                        <StyledPaper elevation={0}>
                            <SingleFileUpload file={imageFile} onChange={handleFileChange} />
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
                        <StyledPaper elevation={0}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <FormLabel>{t("firstName")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="firstName"
                                        placeholder={t("firstName")}
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
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && t(formik.errors.lastName)}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <FormLabel>{t("phoneNumber")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="phoneNumber"
                                        placeholder={t("phoneNumber")}
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && t(formik.errors.phoneNumber)}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <FormLabel>{t("email")}</FormLabel>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="email"
                                        placeholder={t("email")}
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && t(formik.errors.email)}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <FormLabel>{t("dob")}</FormLabel>
                                    <DesktopDatePicker
                                        name="dob"
                                        disableCloseOnSelect
                                        value={formik.values.dob}
                                        onChange={(e) => { formik.setFieldValue("dob", e) }}
                                        renderInput={(params) => <TextField {...params} />}
                                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                                        helperText={formik.touched.dob && t(formik.errors.dob)}
                                    />
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <FormLabel>{t("type")}</FormLabel>
                                    <Select
                                        name="type"
                                        placeholder={t("type")}
                                        sx={{ width: "100%" }}
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        error={formik.touched.type && Boolean(formik.errors.type)}
                                    >
                                        <MenuItem value={1}>{t("admin")}</MenuItem>
                                        <MenuItem value={2}>{t("superAdmin")}</MenuItem>
                                        <MenuItem value={-1}>{t("user")}</MenuItem>
                                    </Select>
                                    <FormHelperText sx={{ color: "red" }}>{formik.touched.type && t(formik.errors.type)}</FormHelperText>
                                </Grid>

                                {
                                    formik.values.type === 1 &&
                                    <Grid item xs={12} lg={6}>
                                        <FormLabel>{t("shopOwned")}</FormLabel>
                                        <Select
                                            name="sellCompany"
                                            sx={{ width: "100%" }}
                                            value={formik.values.sellCompany}
                                            onChange={formik.handleChange}
                                            error={formik.touched.sellCompany && Boolean(formik.errors.sellCompany)}
                                        >
                                            {
                                                shops.map((item, key) => (
                                                    <MenuItem key={key} value={item.id}>{item.name}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                        <FormHelperText sx={{ color: "red" }}>{formik.touched.sellCompany && t(formik.errors.sellCompany)}</FormHelperText>
                                    </Grid>
                                }
                            </Grid>
                        </StyledPaper>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} textAlign="left">
                    <Typography variant="h6">
                        {t("userAddress")}
                    </Typography>
                </Divider>

                <Grid item xs={12}>
                    <StyledPaper elevation={0}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("house")}</FormLabel>
                                <TextField
                                    rows={8}
                                    fullWidth
                                    margin="dense"
                                    name="address.house"
                                    placeholder={t("house")}
                                    value={formik.values.address.house}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.house') && Boolean(getIn(formik.errors, 'address.house'))}
                                    helperText={getIn(formik.touched, 'address.house') && getIn(formik.errors, 'address.house')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("street")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="address.street"
                                    placeholder={t("street")}
                                    value={formik.values.address.street}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.street') && Boolean(getIn(formik.errors, 'address.street'))}
                                    helperText={getIn(formik.touched, 'address.street') && getIn(formik.errors, 'address.street')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("state")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="address.state"
                                    placeholder={t("state")}
                                    value={formik.values.address.state}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.state') && Boolean(getIn(formik.errors, 'address.state'))}
                                    helperText={getIn(formik.touched, 'address.state') && getIn(formik.errors, 'address.state')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("city")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="address.city"
                                    placeholder={t("city")}
                                    value={formik.values.address.city}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.city') && Boolean(getIn(formik.errors, 'address.city'))}
                                    helperText={getIn(formik.touched, 'address.city') && getIn(formik.errors, 'address.city')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("country")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="address.country"
                                    placeholder={t("country")}
                                    value={formik.values.address.country}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.country') && Boolean(getIn(formik.errors, 'address.country'))}
                                    helperText={getIn(formik.touched, 'address.country') && getIn(formik.errors, 'address.country')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>{t("zipCode")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    name="address.zipCode"
                                    placeholder={t("zipCode")}
                                    value={formik.values.address.zipCode}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.zipCode') && Boolean(getIn(formik.errors, 'address.zipCode'))}
                                    helperText={getIn(formik.touched, 'address.zipCode') && getIn(formik.errors, 'address.zipCode')}
                                />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </CardContent >

            <CardActions>
                <Button startIcon={<Save />} variant="contained" onClick={formik.handleSubmit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/users")}>{t("cancel")}</Button>
            </CardActions>
        </Card >
    )
}

export default UserEdit;
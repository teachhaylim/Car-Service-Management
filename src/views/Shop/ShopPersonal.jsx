import { Cancel, Edit, Save } from '@mui/icons-material';
import { Button, Divider, FormHelperText, FormLabel, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { QueryCategory } from 'api/category.api';
import { uploadFile } from 'api/file.api';
import { UpdateShop } from 'api/shop.api';
import { SingleFileUpload } from 'components/CustomComponents/SingleFileUpload';
import { getIn, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SetShopInfo } from 'store';
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
    name: Yup.string().required("Shop name is required"),
    description: Yup.string(),
    logo: Yup.string(),
    categories: Yup.array().min(1, "Category is required"),
    address: Yup.object().shape({
        house: Yup.string().required("House is required"),
        street: Yup.string().required("Street is required"),
        state: Yup.string().required("State is required"),
        city: Yup.string().required("City is required"),
        country: Yup.string().required("Country is required"),
        zipCode: Yup.string().required("Zipcode is required"),
    }),
});

const ShopPersonal = () => {
    const shopInfo = useSelector(store => store.shop, shallowEqual);
    const dispatch = useDispatch();
    const [category, setCategory] = useState([]);
    const [imageFile, setImageFile] = useState(shopInfo.logo || "");
    const [isEdit, setIsEdit] = useState(false);
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: shopInfo.name || "",
            description: shopInfo.description || "",
            logo: shopInfo.logo || "",
            categories: shopInfo.categories?.map((item) => item.id) || [],
            address: {
                id: shopInfo.address?.id || "",
                house: shopInfo.address?.house || "",
                street: shopInfo.address?.street || "",
                state: shopInfo.address?.state || "",
                city: shopInfo.address?.city || "",
                country: shopInfo.address?.country || "",
                zipCode: shopInfo.address?.zipCode || "",
            },
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            if (imageFile instanceof File) {
                await uploadFile(imageFile)
                    .then(res => {
                        if (res && res.meta === 201) {
                            values.logo = res.file.filename;
                            return;
                        }

                        toast.success(t("uploadFailed"));
                    })
                    .catch(err => {
                        toast.error(err.message)
                    });
            }

            UpdateShop(shopInfo.id, values)
                .then(res => {
                    if (res.meta === 200) {
                        setIsEdit(false);
                        dispatch(SetShopInfo(res.data));

                        return toast.success(t("updateSuccess"));
                    }

                    toast.success(t("updateFailed"));
                })
                .catch(err => {
                    toast.error(t(`updateFailed - ${err.message}`));
                })
        },
    });

    const FetchCategory = () => {
        QueryCategory({ limit: -1 })
            .then(res => {
                if (res.meta === 200) {
                    const temp = res.results.map((item) => {
                        return {
                            title: item.name,
                            value: item.id,
                        }
                    })

                    setCategory(temp);
                }
            })
            .catch(err => {
                toast.error(err.message);
            })
    };

    const handleClick = () => {
        if (isEdit) {
            formik.handleSubmit();
            setIsEdit(false)
            return;
        }

        setIsEdit(true);
    };

    useEffect(() => {
        FetchCategory();

    }, []);

    return (
        <>
            <Grid sx={{ mt: 0 }} item container spacing={2}>
                <Grid height={"100%"} item xs={12} sm={6} md={5} lg={4} xl={3}>
                    <StyledPaper elevation={0}>
                        <SingleFileUpload file={imageFile} onChange={(value) => setImageFile(value)} isEdit={!isEdit} />
                    </StyledPaper>
                </Grid>

                <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
                    <StyledPaper elevation={0}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12}>
                                <Divider sx={{ my: 0 }} textAlign="left">
                                    <Typography variant="h6">
                                        {t("shopInfo")}
                                    </Typography>
                                </Divider>
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <FormLabel>{t("shopName")}</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    variant="outlined"
                                    name="name"
                                    placeholder={t("shopName")}
                                    disabled={!isEdit}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && t(formik.errors.name)}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <FormLabel>{t("shopCategory")}</FormLabel>
                                <Select
                                    name="categories"
                                    multiple
                                    disabled={!isEdit}
                                    sx={{ mt: 1, width: "100%" }}
                                    value={formik.values.categories}
                                    onChange={formik.handleChange}
                                    error={formik.touched.categories && Boolean(formik.errors.categories)}
                                >
                                    {
                                        category.map((item, key) => (
                                            <MenuItem key={key} value={item.value}>{item.title}</MenuItem>
                                        ))
                                    }
                                </Select>
                                <FormHelperText sx={{ color: "red" }}>{formik.touched.categories && t(formik.errors.categories)}</FormHelperText>
                            </Grid>

                            <Grid item xs={12}>
                                <FormLabel>{t("description")}</FormLabel>
                                <TextField
                                    multiline={true}
                                    rows={6}
                                    fullWidth
                                    name="description"
                                    placeholder={t("description")}
                                    disabled={!isEdit}
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    error={formik.touched.description && Boolean(formik.errors.description)}
                                    helperText={formik.touched.description && t(formik.errors.description)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Divider sx={{ my: 0 }} textAlign="left">
                                    <Typography variant="h6">
                                        {t("shopAddress")}
                                    </Typography>
                                </Divider>
                            </Grid>

                            <Grid item xs={12}>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12} sm={6} lg={4}>
                                        <FormLabel>{t("house")}</FormLabel>
                                        <TextField
                                            rows={8}
                                            fullWidth
                                            margin="dense"
                                            name="address.house"
                                            placeholder={t("house")}
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
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
                                            disabled={!isEdit}
                                            value={formik.values.address.zipCode}
                                            onChange={formik.handleChange}
                                            error={getIn(formik.touched, 'address.zipCode') && Boolean(getIn(formik.errors, 'address.zipCode'))}
                                            helperText={getIn(formik.touched, 'address.zipCode') && getIn(formik.errors, 'address.zipCode')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item container xs={12} alignItems="end" justifyContent="end">
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

export default ShopPersonal;
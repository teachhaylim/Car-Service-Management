import { Edit, Save } from '@mui/icons-material';
// eslint-disable-next-line
import { Autocomplete, Button, Card, CardActions, CardContent, Divider, FormLabel, Grid, Paper, TextField, Typography } from '@mui/material';
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
    // eslint-disable-next-line
    const [category, setCategory] = useState([]);
    const [imageFile, setImageFile] = useState(shopInfo.logo || "");
    const [isEdit, setIsEdit] = useState(false);
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            name: shopInfo.name || "",
            description: shopInfo.description || "",
            logo: shopInfo.logo || "",
            categories: shopInfo.categories || [],
            address: {
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
                const file = new FormData();
                file.append('file', imageFile);

                await uploadFile(file)
                    .then(res => {
                        if (res && res.meta === 201) {
                            values.logo = res.file.filename;
                        }
                    })
                    .catch(err => {
                        toast.error(err.message)
                    });
            }

            values.address.id = shopInfo.address.id;

            UpdateShop(shopInfo.id, values)
                .then(res => {
                    if (res.meta === 200) {
                        setIsEdit(false);
                        dispatch(SetShopInfo(res.data));

                        return toast.success("Shop updated");
                    }
                })
                .catch(err => {
                    console.log(`err`, err)
                    return toast.error(err.message);
                })
        },
    });

    const FetchCategory = () => {
        QueryCategory({ limit: -1 })
            .then(res => {
                if (res.meta === 200) {
                    const temp = res.results.map((item) => {
                        return {
                            label: item.name,
                            value: item.id,
                        }
                    })

                    setCategory(temp);
                }
            })
            .catch(err => {
                toast.error(err.message);
                console.log("Query Category Error", err);
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

    // eslint-disable-next-line
    const handleCategoryChange = (e, value) => {
        formik.setFieldValue("categories", e);
    };

    useEffect(() => {
        FetchCategory();

    }, []);

    return (
        <Card>
            <CardContent>
                <Divider textAlign="left">
                    <Typography variant="h6">
                        Shop Info
                    </Typography>
                </Divider>

                <Grid sx={{ mt: 0 }} item container spacing={2}>
                    <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
                        <StyledPaper elevation={0}>
                            <SingleFileUpload file={imageFile} onChange={(value) => setImageFile(value)} isEdit={!isEdit} />
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={7} lg={8} xl={9}>
                        <StyledPaper elevation={0}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <FormLabel>Shop name</FormLabel>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                        variant="outlined"
                                        name="name"
                                        disabled={!isEdit}
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && t(formik.errors.name)}
                                    />
                                </Grid>

                                {/* FIXME category doesnt update value */}
                                <Grid item xs={12} lg={6}>
                                    <FormLabel>Shop category</FormLabel>
                                    {/* <Autocomplete
                                        name="categories"
                                        multiple
                                        size="small"
                                        sx={{ mt: 1, width: "100%" }}
                                        disabled={!isEdit}
                                        options={category}
                                        disableCloseOnSelect
                                        limitTags={3}
                                        getOptionLabel={(option) => option.label}
                                        // isOptionEqualToValue={(option, value) => option}
                                        value={formik.values.categories}
                                        onChange={handleCategoryChange}
                                        // error={formik.touched.categories && Boolean(formik.errors.categories)}
                                        // helperText={formik.touched.categories && t(formik.errors.categories)}
                                        renderInput={(params) => <TextField {...params} label="" />}
                                    /> */}
                                </Grid>

                                <Grid item xs={12}>
                                    <FormLabel>Description</FormLabel>
                                    <TextField
                                        multiline={true}
                                        rows={8}
                                        fullWidth
                                        size="small"
                                        name="description"
                                        disabled={!isEdit}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && t(formik.errors.description)}
                                    />
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} textAlign="left">
                    <Typography variant="h6">
                        Shop Address
                    </Typography>
                </Divider>

                <Grid item xs={12}>
                    <StyledPaper elevation={0}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>House</FormLabel>
                                <TextField
                                    rows={8}
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.house"
                                    disabled={!isEdit}
                                    value={formik.values.address.house}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.house') && Boolean(getIn(formik.errors, 'address.house'))}
                                    helperText={getIn(formik.touched, 'address.house') && getIn(formik.errors, 'address.house')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>Street</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.street"
                                    disabled={!isEdit}
                                    value={formik.values.address.street}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.street') && Boolean(getIn(formik.errors, 'address.street'))}
                                    helperText={getIn(formik.touched, 'address.street') && getIn(formik.errors, 'address.street')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>State</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.state"
                                    disabled={!isEdit}
                                    value={formik.values.address.state}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.state') && Boolean(getIn(formik.errors, 'address.state'))}
                                    helperText={getIn(formik.touched, 'address.state') && getIn(formik.errors, 'address.state')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>City</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.city"
                                    disabled={!isEdit}
                                    value={formik.values.address.city}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.city') && Boolean(getIn(formik.errors, 'address.city'))}
                                    helperText={getIn(formik.touched, 'address.city') && getIn(formik.errors, 'address.city')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>Country</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.country"
                                    disabled={!isEdit}
                                    value={formik.values.address.country}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.country') && Boolean(getIn(formik.errors, 'address.country'))}
                                    helperText={getIn(formik.touched, 'address.country') && getIn(formik.errors, 'address.country')}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} lg={4}>
                                <FormLabel>Zipcode</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    name="address.zipCode"
                                    disabled={!isEdit}
                                    value={formik.values.address.zipCode}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.zipCode') && Boolean(getIn(formik.errors, 'address.zipCode'))}
                                    helperText={getIn(formik.touched, 'address.zipCode') && getIn(formik.errors, 'address.zipCode')}
                                />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={isEdit ? <Save /> : <Edit />} variant="contained" onClick={handleClick}>{isEdit ? t("saveBtn") : "Edit"}</Button>
            </CardActions>
        </Card >
    )
}

export default ShopPersonal;
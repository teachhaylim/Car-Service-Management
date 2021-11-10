import { Close, Save } from '@mui/icons-material';
import { Select, Button, Card, CardActions, CardContent, Divider, FormLabel, Grid, Paper, TextField, Typography, MenuItem, FormHelperText } from '@mui/material';
import { styled } from '@mui/styles';
import { QueryCategory } from 'api/category.api';
import { uploadFile } from 'api/file.api';
// eslint-disable-next-line
import { UpdateShop } from 'api/shop.api';
import { CreateShop } from 'api/shop.api';
import { SingleFileUpload } from 'components/CustomComponents/SingleFileUpload';
import { getIn, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
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
        zipcode: Yup.string().required("Zipcode is required"),
    }),
});

const ShopEdit = () => {
    const shop = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;
    const [category, setCategory] = useState([]);
    const [imageFile, setImageFile] = useState(shop.logo || {});
    const { t } = useTranslation();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: shop.name || "",
            description: shop.description || "",
            logo: shop.logo || "",
            categories: shop.categories || [],
            address: {
                house: shop.address?.house || "",
                street: shop.address?.street || "",
                state: shop.address?.state || "",
                city: shop.address?.city || "",
                country: shop.address?.country || "",
                zipcode: shop.address?.zipcode || "",
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

            if (isEdit) {
                values.address.id = shop.address.id;
                console.log(shop.id, values);

                // UpdateShop(shop.id, values)
                //     .then(res => {
                //         if (res && res.meta === 201) {
                //             navigate("/app/shops");

                //             return toast.success("Shop updated");
                //         }
                //     })
                //     .catch(err => {
                //         return toast.error(err.message);
                //     })
            }

            CreateShop(values)
                .then(res => {
                    if (res && res.meta === 201) {
                        navigate("/app/shops");

                        return toast.success("Shop created");
                    }
                })
                .catch(err => {
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
                            title: item.name,
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

    const handleFileChange = (value) => {
        setImageFile(value);
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
                            <SingleFileUpload file={imageFile} onChange={handleFileChange} />
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
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && t(formik.errors.name)}
                                    />
                                </Grid>

                                {/* <Grid item xs={12} lg={6}>
                                    <FormLabel>Shop category</FormLabel>
                                    <Select
                                        name="categories"
                                        multiple
                                        size="small"
                                        defaultValue={formik.values.categories.map(p => ({ title: p.name, value: p.id }))}
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
                                </Grid> */}

                                <Grid item xs={12}>
                                    <FormLabel>Description</FormLabel>
                                    <TextField
                                        multiline={true}
                                        rows={8}
                                        fullWidth
                                        size="small"
                                        name="description"
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
                                    name="address.zipcode"
                                    value={formik.values.address.zipcode}
                                    onChange={formik.handleChange}
                                    error={getIn(formik.touched, 'address.zipcode') && Boolean(getIn(formik.errors, 'address.zipcode'))}
                                    helperText={getIn(formik.touched, 'address.zipcode') && getIn(formik.errors, 'address.zipcode')}
                                />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={<Save />} variant="contained" onClick={formik.handleSubmit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/shops")}>{t("cancelBtn")}</Button>
            </CardActions>
        </Card >
    )
}

export default ShopEdit;
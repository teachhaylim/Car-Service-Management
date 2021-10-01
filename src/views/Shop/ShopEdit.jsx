import { Close, Save, Upload } from '@mui/icons-material';
import { Select, Avatar, Button, Card, CardActions, CardContent, Divider, FormLabel, Grid, Paper, TextField, Typography, MenuItem, FormHelperText, Input } from '@mui/material';
import { styled } from '@mui/styles';
import { QueryCategory } from 'api/category.api';
import { uploadFile } from 'api/file.api';
import { getIn, useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
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

const StyledAvatar = styled(Avatar)(({ theme }) => {
    return {
        boxShadow: "0 0 6px 0 rgba(0, 0, 0, 0.2)",
        borderRadius: theme.borderRadius,
        "&:hover": {
            transition: "0.2s all",
            border: `1px solid ${theme.palette.secondary.main}`,
        }
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
    const [category, setCategory] = useState([]);
    const fileUploadRef = useRef(null);
    const [imageFile, setImageFile] = useState("");
    const { t } = useTranslation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            logo: "",
            categories: [],
            address: {
                house: "",
                street: "",
                state: "",
                city: "",
                country: "",
                zipcode: "",
            },
        },
        validationSchema: validateSchema,
        onSubmit: async (values) => {
            console.log(values);
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

    const Submit = () => {
        const file = new FormData();
        file.append("file", imageFile);

        console.log(`file`, new FormData().append("file", imageFile))

        uploadFile(file)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                toast.error(err.message);
                console.log('err :>> ', err);
            })
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
                            <Grid container direction="column" sx={{ height: "100%" }} alignItems="center" justifyContent="space-around">
                                <Grid item sx={{ width: "80%", height: "80%" }}>
                                    <StyledAvatar variant="rounded" sx={{ width: "100%", height: "100%", }} />
                                </Grid>

                                <Grid item sx={{ height: "10%" }}>
                                    <Button onClick={() => fileUploadRef.current.click()} color="primary" component="span" variant="outlined" startIcon={<Upload />}>
                                        <Input inputRef={fileUploadRef} onChange={(e) => setImageFile([...e.target.files])} style={{display: "none"}} accept="image/*" type="file" />
                                        Upload
                                    </Button>
                                </Grid>
                            </Grid>
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

                                <Grid item xs={12} lg={6}>
                                    <FormLabel>Shop category</FormLabel>
                                    <Select
                                        name="categories"
                                        multiple
                                        size="small"
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
                                    <FormHelperText sx={{color: "red"}}>{formik.touched.categories && t(formik.errors.categories)}</FormHelperText>
                                </Grid>

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
                <Button startIcon={<Save />} variant="contained" onClick={Submit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/shops")}>{t("cancelBtn")}</Button>
            </CardActions>
        </Card >
    )
}

export default ShopEdit;
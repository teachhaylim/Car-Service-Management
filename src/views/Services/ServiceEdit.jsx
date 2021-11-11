import { Close, Save } from '@mui/icons-material';
import { Grid, Card, CardContent, Divider, Typography, FormLabel, TextField, CardActions, Button } from '@mui/material';
import { CreateService, UpdateService } from 'api/service.api';
import { useFormik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const validateSchema = Yup.object({
    name: Yup.string()
        .required("Service name is required"),
    price: Yup.number()
        .required("Price is required"),
    remark: Yup.string(),
});

const ServiceEdit = () => {
    const service = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;
    const shopInfo = useSelector(store => store.shop, shallowEqual);
    const role = useSelector(store => store.role, shallowEqual);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            id: service.id || "",
            name: service.name || "",
            sellCompany: service.sellCompany?.id || "",
            price: service.price || "",
            remark: service.remark || "",
            isActive: service.isActive || true,
        },
        validationSchema: validateSchema,
        onSubmit: (values) => {
            if (role === 1) {
                values.sellCompany = shopInfo.id;
            }

            if (isEdit) {
                UpdateService(values.id, values)
                    .then(res => {
                        if (res.meta === 200) {
                            navigate("/app/services");
                            return toast.success("Service updated");
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return toast.success(err.message);
                    })

                return;
            }

            CreateService(values)
                .then(res => {
                    if (res.meta === 201) {
                        navigate("/app/services");
                        return toast.success("Service created");
                    }
                })
                .catch(err => {
                    toast.success(err.message);
                })
        },
    });

    return (
        <Card>
            <CardContent>
                <Divider textAlign="left">
                    <Typography variant="h6">Service info</Typography>
                </Divider>

                <Grid item container spacing={2}>
                    <Grid item xs={12} lg={4}>
                        <FormLabel>Service name</FormLabel>
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

                    <Grid item xs={12} lg={4}>
                        <FormLabel>Price</FormLabel>
                        <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            variant="outlined"
                            name="price"
                            type="number"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && t(formik.errors.price)}
                        />
                    </Grid>

                    {
                        role === 2 ?? (
                            <Grid item xs={12} lg={4}>
                                <FormLabel>Sell Company</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    variant="outlined"
                                    name="sellCompany"
                                    value={formik.values.sellCompany}
                                    onChange={formik.handleChange}
                                    error={formik.touched.sellCompany && Boolean(formik.errors.sellCompany)}
                                    helperText={formik.touched.sellCompany && t(formik.errors.sellCompany)}
                                />
                            </Grid>
                        )
                    }

                    <Grid item xs={12}>
                        <FormLabel>Remark</FormLabel>
                        <TextField
                            fullWidth
                            multiline
                            rows={8}
                            margin="dense"
                            size="small"
                            variant="outlined"
                            name="remark"
                            value={formik.values.remark}
                            onChange={formik.handleChange}
                            error={formik.touched.remark && Boolean(formik.errors.remark)}
                            helperText={formik.touched.remark && t(formik.errors.remark)}
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={<Save />} variant="contained" onClick={formik.handleSubmit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/services")}>{t("cancel")}</Button>
            </CardActions>
        </Card>
    )
}

export default ServiceEdit

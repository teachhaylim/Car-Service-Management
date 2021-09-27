import { Close, Save } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { CreateCategory } from 'api/category.api';
import { UpdateCategory } from 'api/category.api';
import { useFormik } from 'formik';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string()
        .required("categoryIsRequired"),
    remark: Yup.string()
        .nullable(),
})

const CategoryEdit = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const category = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;
    const formik = useFormik({
        initialValues: {
            name: category.name || "",
            remark: category.remark || "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            formik.resetForm();

            if (isEdit) {
                if (!category.id) {
                    toast.warn(t("missingId"));
                    return navigate("/app/category");
                }

                UpdateCategory(category.id, values)
                    .then((res) => {
                        if (res.meta === 200) {
                            toast.success("Category updated successfully");
                            return navigate("/app/category");
                        }
                    })
                    .catch(err => {
                        toast.error(err.message);
                    })

                return;
            }

            CreateCategory(values)
                .then((res) => {
                    if (res.meta === 201) {
                        toast.success("Category added successfully");
                        return navigate("/app/category");
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                    return navigate("/app/category");
                })
        }
    });

    return (
        <Card>
            <CardHeader
                title={<Typography variant="h6">{t("newCategory")}</Typography>}
            />

            <Divider />

            <CardContent>
                <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6} md={5}>
                        <Grid item>
                            <FormLabel> {t("categoryName")} </FormLabel>
                            <TextField
                                variant="outlined"
                                size="small"
                                margin="dense"
                                name="name"
                                fullWidth
                                placeholder={formik.name}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && t(formik.errors.name)}
                            />
                        </Grid>

                        <Grid item >
                            <FormLabel> {t("remark")} </FormLabel>
                            <TextField
                                multiline={true}
                                rows={6}
                                margin="dense"
                                name="remark"
                                fullWidth
                                placeholder={formik.remark}
                                value={formik.values.remark}
                                onChange={formik.handleChange}
                                error={formik.touched.remark && Boolean(formik.errors.remark)}
                                helperText={formik.touched.remark && formik.errors.remark}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={<Save />} variant="contained" onClick={formik.handleSubmit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/category")}>{t("cancelBtn")}</Button>
            </CardActions>
        </Card>
    )
}

export default CategoryEdit;

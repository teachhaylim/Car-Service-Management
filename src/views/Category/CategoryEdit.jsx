import { Close, Save } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormLabel, Grid, TextField, Typography } from '@mui/material';
import { CreateCategory } from 'api/category.api';
import { UpdateCategory } from 'api/category.api';
import { SingleFileUpload } from 'components/CustomComponents/SingleFileUpload';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import * as Yup from "yup";
import { uploadFile } from 'api/file.api';

const validationSchema = Yup.object({
    name: Yup.string()
        .required("categoryIsRequired"),
    remark: Yup.string()
        .nullable(),
});

const CategoryEdit = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const category = useLocation().state.object;
    const isEdit = useLocation().state.isEdit;
    const [imageFile, setImageFile] = useState(category.image || "");
    const formik = useFormik({
        initialValues: {
            name: category.name || "",
            remark: category.remark || "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            if (imageFile instanceof File) {
                const file = new FormData();
                file.append('file', imageFile);

                await uploadFile(file)
                    .then(res => {
                        if (res && res.meta === 201) {
                            values.image = res.file.filename;
                        }
                    })
                    .catch(err => {
                        toast.error(err.message)
                    });
            }

            if (isEdit) {
                if (!category.id) {
                    toast.warn(t("missingId"));
                    return navigate("/app/category");
                }

                UpdateCategory(category.id, values)
                    .then((res) => {
                        if (res.meta === 200) {
                            return toast.success(t("updateSuccess"));
                        }

                        toast.success(t("updateFailed"));
                    })
                    .catch(err => {
                        toast.error(err.message);
                    })
                    .finally(() => {
                        navigate("/app/category");
                        formik.resetForm();
                    })

                return;
            }

            CreateCategory(values)
                .then((res) => {
                    if (res.meta === 201) {
                        return toast.success(t("createSuccess"));
                    }

                    toast.success(t("createFailed"));
                })
                .catch(err => {
                    toast.error(err.message);
                })
                .finally(() => {
                    navigate("/app/category");
                    formik.resetForm();
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
                    <Grid item xs={12} sm={6} md={8} lg={9}>
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

                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <SingleFileUpload file={imageFile} onChange={(value) => setImageFile(value)} />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={<Save />} variant="contained" onClick={formik.handleSubmit}>{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/category")}>{t("cancel")}</Button>
            </CardActions>
        </Card>
    )
}

export default CategoryEdit;

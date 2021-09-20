import React from 'react';
import { Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const categories = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
]

//TODO fetch category
const ShopForm = ({ formik }) => {
    const { t } = useTranslation();

    return (
        <>
            <Divider textAlign="left" sx={{ mt: 2 }}>
                <Typography variant="body1">{t("shopInfo")}</Typography>
            </Divider>

            <Stack>
                <TextField
                    name="shopName"
                    variant="standard"
                    label={t("shopName")}
                    margin="dense"
                    value={formik.values.shopName}
                    onChange={formik.handleChange}
                    error={formik.touched.shopName && Boolean(formik.errors.shopName)}
                    helperText={formik.touched.shopName && formik.errors.shopName}
                />

                <TextField
                    name="category"
                    select
                    variant="standard"
                    label={t("category")}
                    margin="dense"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                >
                    {
                        categories.map((item, key) => (
                            <MenuItem key={key} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Stack>
        </>
    )
}

export default ShopForm;

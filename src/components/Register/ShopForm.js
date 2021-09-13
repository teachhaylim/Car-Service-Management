import React from 'react';
import { Divider, MenuItem, Stack, TextField, Typography } from '@material-ui/core';

const categories = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
]

const ShopForm = ({ formik }) => {
    return (
        <>
            <Divider textAlign="left" sx={{ mt: 2 }}>
                <Typography variant="body1">Shop Info</Typography>
            </Divider>

            <Stack>
                <TextField
                    name="shopName"
                    variant="standard"
                    label="Shop name"
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
                    label="Category"
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

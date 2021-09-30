import { Close, Save, Upload } from '@mui/icons-material';
import { Autocomplete, Avatar, Button, Card, CardActions, CardContent, Divider, FormLabel, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { QueryCategory } from 'api/category.api';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

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

const ShopEdit = () => {
    const [category, setCategory] = useState([]);
    const { t } = useTranslation();
    const navigate = useNavigate();

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
    }

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
                    <Grid item xs={12} sm={4} md={3}>
                        <StyledPaper elevation={0}>
                            <Grid container direction="column" sx={{ height: "100%" }} alignItems="center" justifyContent="space-around">
                                <Grid item sx={{ width: "80%", height: "80%" }}>
                                    <StyledAvatar variant="rounded" sx={{ width: "100%", height: "100%", }} />
                                </Grid>

                                <Grid item sx={{ height: "10%" }}>
                                    <Button color="primary" variant="outlined" startIcon={<Upload />}>
                                        Upload
                                    </Button>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Grid>

                    <Grid item xs={12} sm={8} md={9}>
                        <StyledPaper elevation={0}>
                            <Grid item container spacing={2}>
                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Shop name</FormLabel>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <FormLabel>Shop category</FormLabel>
                                    <Autocomplete
                                        options={category}
                                        multiple
                                        margin="dense"
                                        size="small"
                                        disableCloseOnSelect
                                        limitTags={2}
                                        sx={{ mt: 1 }}
                                        getOptionLabel={(option) => option.title}
                                        renderInput={(params) => <TextField {...params} label="" />}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormLabel>Description</FormLabel>
                                    <TextField
                                        multiline={true}
                                        maxRows={12}
                                        rows={8}
                                        fullWidth
                                        size="small"
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
                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>Name</FormLabel>
                                <TextField
                                    rows={8}
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>Street</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>State</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>City</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>Country</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormLabel>Zipcode</FormLabel>
                                <TextField
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                    type="number"
                                />
                            </Grid>
                        </Grid>
                    </StyledPaper>
                </Grid>
            </CardContent>

            <CardActions>
                <Button startIcon={<Save />} variant="contained" >{t("submitBtn")}</Button>

                <Button startIcon={<Close />} color="error" variant="outlined" onClick={() => navigate("/app/shops")}>{t("cancelBtn")}</Button>
            </CardActions>
        </Card >
    )
}

export default ShopEdit;
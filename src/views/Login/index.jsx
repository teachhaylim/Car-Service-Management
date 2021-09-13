import React from 'react';
import { LoginForm } from 'components/Login';
import { Grid, Container, Stack, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { styled } from '@material-ui/styles';

const ImageView = styled("img")(({ theme }) => {
    return {
        height: "100%",
        width: "100%",
        objectFit: "cover",
    }
});

const LoginView = () => {
    const imgUrl = "https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
                <Grid item xs={12} sm={6} md={6} lg={7} xl={7} sx={{ height: "100%" }}>
                    <ImageView src={imgUrl} alt="login" />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5} xl={5}>
                    <Container maxWidth="xl">
                        <Stack sx={{ mb: 2 }}>
                            <Typography variant="h4" gutterBottom> Let's get started </Typography>

                            <Stack direction="row" alignItems="center">
                                <Typography>Don't have an account?</Typography>

                                <Link sx={{ ml: 1 }} component={RouterLink} to="/register" underline="none" variant="subtitle2">
                                    Create a new account
                                </Link>
                            </Stack>
                        </Stack>

                        <LoginForm />
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default LoginView;
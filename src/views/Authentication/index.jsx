import React from 'react';
import { LoginForm } from 'components/CustomComponents/Login';
import { RegisterForm } from 'components/CustomComponents/Register';
import { Grid, Container, Stack, Typography } from '@material-ui/core';
import { LinkButton } from 'components/CustomComponents/LinkButton';

const AuthenticationIndex = () => {
    const imgUrl = "https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    const [option, setOption] = React.useState(true);

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
                <Grid item xs={12} sm={6} md={6} lg={7} xl={7} sx={{ height: "100%" }}>
                    <img src={imgUrl} alt="login" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                </Grid>

                <Grid item xs={12} sm={6} md={6} lg={5} xl={5}>
                    <Container maxWidth="xl">
                        <Stack sx={{ mb: 2 }}>
                            <Typography variant="h4" gutterBottom> Let's get started </Typography>

                            <Stack direction="row" alignItems="center">
                                <Typography>{option ? "Don't have account?" : "Already have account? "}</Typography>

                                <LinkButton sx={{ ml: 1 }} color="blue" onClick={() => setOption(!option)}>
                                    {option ? "Register" : "Login"}
                                </LinkButton>
                            </Stack>
                        </Stack>

                        {
                            option ? <LoginForm /> : <RegisterForm />
                        }
                    </Container>
                </Grid>
            </Grid>
        </>
    )
}

export default AuthenticationIndex;
import React from 'react';
import { LoginForm } from 'components/Login';
import { Paper, Button, Stack, Typography, Link } from '@material-ui/core';
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Login } from 'api/auth.api';
import { SetToken } from 'store';
import { SetUserInfo } from 'store';
import { toast } from 'react-toastify';

const validationSchema = Yup.object({
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginView = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Login({email: values.email, password: values.password})
            .then(res => {
                if(res.meta === 200){
                    dispatch(SetToken(res.token));
                    dispatch(SetUserInfo(res.user));
                    history("/");
                }
            })
            .catch(err => {
                formik.resetForm();
                toast.error(err.message);
            })
        },
    });

    return (
        <>
            <Paper sx={{ p: 4, minWidth: "40%", borderRadius: "8px" }} elevation={6}>
                <form onSubmit={formik.handleSubmit}>
                    <Typography align="left" variant="h5">
                        Welcome back!
                    </Typography>

                    <Typography align="left" variant="subtitle2" gutterBottom>
                        Let's get started
                    </Typography>

                    <LoginForm formik={formik} />

                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography sx={{ mr: 0.5 }}>
                                Don't have an account?
                            </Typography>

                            <Link component={RouterLink} to="/register" underline="none" variant="subtitle2">
                                Register
                            </Link>
                        </Stack>

                        <Link component={RouterLink} to="#" underline="none" variant="subtitle2">
                            Forget password?
                        </Link>
                    </Stack>

                    <Button variant="outlined" fullWidth sx={{ mt: 2 }} type="submit">
                        Login
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default LoginView;
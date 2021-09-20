import React from 'react';
import { LoginForm } from 'components/Login';
import { Paper, Button, Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { Login } from 'api/auth.api';
import { SetUserInfo, SetToken, SetIsLogin, SetRole } from 'store';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie/es6';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            Login({ email: values.email, password: values.password })
                .then(res => {
                    if (res.meta === 200) {
                        if (res.user.type === 0) {
                            formik.resetForm();
                            return toast.error("Unauthorized account, You don't have permission to access");
                        }

                        const cookies = new Cookies();
                        cookies.set('XTOK', res.token);

                        //TODO get shop info
                        dispatch(SetToken(res.token));
                        dispatch(SetUserInfo(res.user));
                        dispatch(SetIsLogin(true));
                        dispatch(SetRole(res.user.type));

                        history("/");
                        formik.resetForm();
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
                        {t("welcomeBack")}
                    </Typography>

                    <Typography align="left" variant="subtitle2" gutterBottom>
                        {t("getStarted")}
                    </Typography>

                    <LoginForm formik={formik} />

                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography sx={{ mr: 0.5 }}>
                                {t("dontHaveAccount")}
                            </Typography>

                            <Link component={RouterLink} to="/register" underline="none" variant="subtitle2">
                                {t("register")}
                            </Link>
                        </Stack>

                        <Link component={RouterLink} to="#" underline="none" variant="subtitle2">
                            {t("forgotPassword")}
                        </Link>
                    </Stack>

                    <Button variant="outlined" fullWidth sx={{ mt: 2 }} type="submit">
                        {t("login")}
                    </Button>
                </form>
            </Paper>
        </>
    )
}

export default LoginView;
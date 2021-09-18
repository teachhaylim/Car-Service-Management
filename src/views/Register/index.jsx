import { Button, Link, Paper, Stack, Typography } from '@material-ui/core';
import { PersonalForm, ShopForm } from 'components/Register';
import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object({
    firstname: Yup
        .string('Enter your first name')
        .required('First name is required'),
    lastname: Yup
        .string('Enter your last name')
        .required('Last name is required'),
    email: Yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: Yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    passwordConfirmation: Yup
        .string("Enter confirm password")
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    shopName: Yup
        .string('Enter shop name')
        .required('Shop name is required'),
    category: Yup
        .string('Select category')
        .required('Category is required'),
});

const RegisterView = () => {
    const { t } = useTranslation();
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: '',
            password: '',
            passwordConfirmation: "",
            shopName: "",
            category: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            alert(JSON.stringify(values, null, 1));

            resetForm();
        },
    });

    return (
        <Paper sx={{ p: 4, minWidth: "40%", borderRadius: "8px" }} elevation={6}>
            <form onSubmit={formik.handleSubmit}>
                <Typography align="left" variant="h5" gutterBottom>
                    {t("createNewAccount")}
                </Typography>

                <PersonalForm formik={formik} />

                <ShopForm formik={formik} />

                <Stack direction="row" justifyContent="space-between" sx={{ mt: 3 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ mr: 0.5 }}>
                            {t("alreadyHaveAccount")}
                        </Typography>

                        <Link component={RouterLink} to="/login" underline="none" variant="subtitle2">
                            {t("login")}
                        </Link>
                    </Stack>

                    <Button variant="outlined" sx={{ width: "250px" }} type="submit">
                        {t("register")}
                    </Button>
                </Stack>
            </form>
        </Paper>
    )
};

export default RegisterView;

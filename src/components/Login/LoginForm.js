import React from 'react';
import { Button, Stack, TextField } from '@material-ui/core';
import { useFormik } from "formik";
import * as yup from "yup";
import { LinkButton } from '../CustomComponents/LinkButton';

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 1));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    margin="dense"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="end" sx={{ mt: 2 }}>
                {/* <FormGroup>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Password"></FormControlLabel>
                </FormGroup> */}

                <LinkButton>
                    Forgot password?
                </LinkButton>
            </Stack>

            <Stack sx={{ mt: 2 }}>
                <Button color="secondary" variant="contained" fullWidth type="submit"> Submit </Button>
            </Stack>
        </form>
    )
}

export default LoginForm;

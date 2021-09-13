import React from 'react'
import { Divider, Stack, TextField, Typography } from '@material-ui/core';

const PersonalForm = ({ formik }) => {
    return (
        <>
            <Divider textAlign="left" sx={{ my: 1 }}>
                <Typography variant="body1">Personal Info</Typography>
            </Divider>

            <Stack>
                <TextField
                    name="firstname"
                    variant="standard"
                    label="First name"
                    margin="dense"
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                    helperText={formik.touched.firstname && formik.errors.firstname}
                />

                <TextField
                    name="lastname"
                    variant="standard"
                    label="Last name"
                    margin="dense"
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                    helperText={formik.touched.lastname && formik.errors.lastname}
                />

                <TextField
                    name="email"
                    variant="standard"
                    label="Email"
                    margin="dense"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
            </Stack>

            <Stack direction="row" justifyContent="center" alignItems="center">
                <TextField
                    name="password"
                    variant="standard"
                    label="Password"
                    margin="dense"
                    sx={{ mr: 2 }}
                    fullWidth
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    name="passwordConfirmation"
                    variant="standard"
                    label="Confirm Password"
                    margin="dense"
                    sx={{ ml: 2 }}
                    fullWidth
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                    helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
            </Stack>
        </>
    )
}

export default PersonalForm

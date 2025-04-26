import { Dialog } from "/src/components/dialog/Dialog";
import { CustomPasswordInput } from "/src/components/formFields/CustomPasswordInput";
import { Button, CircularProgress, FormControl, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Select, Stack } from "@mui/material";

import { useFormik } from "formik";
import React from "react";
import * as Yup from 'yup';
import { createUser, updateUserData } from "./_lib/user.actions";


const getValidationSchema = (isUpdated) => {
    return Yup.object().shape({
        fullName: Yup.string().required('Full Name is required'),
        username: Yup.string().required('Username is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        role: Yup.string().required('Role is required'),
        password: isUpdated ? Yup.string() : Yup.string().required('Password is required'),
        confirm_password: isUpdated ? Yup.string() : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
}

export const ManageUserDialog = (props) => {
    const { open, onClose, onConfirm, data } = props;
    const [loading, setLoading] = React.useState(false);
    const isUpdated = data?._id ? true : false;

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        handleBlur,
        setValues,
        setFieldValue,
        resetForm,
    } = useFormik({
        initialValues: {
            username: data?.username || '',
            email: data?.email || '',
            role: data?.role || '',
            fullName: data?.fullName || '',
            password: '',
            confirm_password: '',
        },
        validationSchema: getValidationSchema(isUpdated),
        onSubmit: async (values) => {
            setLoading(true);
            const payload = {
                username: values.username,
                email: values.email,
                role: values.role,
                fullName: values.fullName,
                ...(isUpdated ? {} : { password: values.password }),
            };

            const res = isUpdated
                ? await updateUserData({ id: data.id, ...payload })
                : await createUser(payload);

            if (res.success) {
                onConfirm();
            }
            setLoading(false);
        }
    })

    return (
        <Dialog
            title={isUpdated ? "Update User" : "Create User"}
            onClose={onClose}
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl fullWidth error={Boolean(errors.username)}>
                            <InputLabel>Username</InputLabel>
                            <OutlinedInput
                                name="username"
                                value={values.username}
                                onChange={handleChange}
                                disabled={isUpdated}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth error={Boolean(errors.fullName)}>
                            <InputLabel>Full Name</InputLabel>
                            <OutlinedInput
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={Boolean(errors.email)}>
                            <InputLabel>Email</InputLabel>
                            <OutlinedInput
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={Boolean(errors.role)}>
                            <InputLabel>Role</InputLabel>
                            <Select
                                labelId="role"
                                id="role"
                                value={values.role}
                                label="Role"
                                onChange={(event) => setFieldValue("role", event.target.value)}
                            >
                                <MenuItem value={"admin"}>Admin</MenuItem>
                                <MenuItem value={"applicant"}>Applicant</MenuItem>
                                <MenuItem value={"evaluator"}>Evaluator</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {!isUpdated && (
                        <>
                            <Grid item xs={6}>
                                <FormControl error={Boolean(errors.password)}>
                                    <InputLabel>Password</InputLabel>
                                    <CustomPasswordInput
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.password)}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl error={Boolean(errors.confirm_password)}>
                                    <InputLabel>Confirm Password</InputLabel>
                                    <CustomPasswordInput
                                        name="confirm_password"
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={Boolean(errors.confirm_password)}
                                    />
                                </FormControl>
                                {errors.confirm_password && (
                                    <FormHelperText>{errors.confirm_password}</FormHelperText>
                                )}
                            </Grid>
                        </>
                    )}

                    <Stack direction="row" justifyContent="flex-end" width="100%" mt={2}>
                        <Button
                            variant="contained"
                            type={loading ? "button" : "submit"}
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {isUpdated ? "Update" : "Create"}
                        </Button>
                    </Stack>
                </Grid>
            </form>
        </Dialog>
    )
}

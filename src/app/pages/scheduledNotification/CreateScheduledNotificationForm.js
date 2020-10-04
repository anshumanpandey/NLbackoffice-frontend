import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, DialogActions } from "@material-ui/core";
import useAxios from 'axios-hooks'

export default ({ onClose, notification }) => {
    const [{ data, loading, error }, doCreate] = useAxios({
        url: '/scheduledNotification/create',
        method: 'POST'
    }, { manual: true })

    return (
        <Dialog
            maxWidth="md"
            maxWidth={"md"}
            fullWidth={true}
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Create ScheduledNotification</DialogTitle>
            <Formik
                initialValues={{ id: notification?._id,timeSpan: notification?.timeSpan || "", timeUnit: notification?.timeUnit || 'H', body: notification?.body || '' }}
                validate={values => {
                    const errors = {};

                    if (!values.timeSpan) errors.timeSpan = "Required";
                    if (!values.body) errors.body = "Required";

                    return errors;
                }}
                onSubmit={(values, { setStatus, setSubmitting }) => {
                    doCreate({ data: values })
                        .then(() => onClose("CREATED"))
                }}
            >
                {({
                    values,
                    status,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                }) => (
                        <>
                            <DialogContent>

                                <form onSubmit={handleSubmit} className="kt-form">
                                    {status && (
                                        <div role="alert" className="alert alert-danger">
                                            <div className="alert-text">{status}</div>
                                        </div>
                                    )}

                                    <div className="form-group">
                                        <TextField
                                            type="number"
                                            label="Time Span"
                                            margin="normal"
                                            fullWidth={true}
                                            name="timeSpan"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.timeSpan}
                                            helperText={touched.timeSpan && errors.timeSpan ? errors.timeSpan : "Send notification every"}
                                            error={Boolean(touched.timeSpan && errors.timeSpan)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="email"
                                            label="Body"
                                            margin="normal"
                                            fullWidth={true}
                                            name="body"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.body}
                                            helperText={touched.body && errors.body}
                                            error={Boolean(touched.body && errors.body)}
                                        />
                                    </div>

                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="timeUnit"
                                            value={values.timeUnit}
                                            onChange={handleChange}
                                            helperText={touched.timeUnit && errors.timeUnit}
                                            error={Boolean(touched.timeUnit && errors.timeUnit)}
                                        >
                                            <MenuItem value={"H"}>Hours</MenuItem>
                                            <MenuItem value={"D"}>Days</MenuItem>
                                        </Select>
                                    </FormControl>
                                </form>
                            </DialogContent>
                            <DialogActions>
                                <Button disabled={loading} style={{ opacity: loading ? 0.5 : 1 }} autoFocus onClick={() => onClose()} color="primary">
                                    Cancel
                </Button>
                                <Button disabled={loading} style={{ opacity: loading ? 0.5 : 1 }} onClick={handleSubmit} color="primary">
                                    Create
          </Button>
                            </DialogActions>
                        </>
                    )}
            </Formik>
        </Dialog>
    );
}
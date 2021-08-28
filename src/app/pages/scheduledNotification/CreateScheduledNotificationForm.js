import React from "react";
import { Formik } from "formik";
import {
  Button,
  Dialog,
  ButtonGroup,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from "@material-ui/core";
import useAxios from "axios-hooks";
import { capitalize } from "../../../_metronic/utils/utils";

const NotificationsTimeSpans = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
};

const NotificationsUserType = {
  Coach: "Coach",
  Player: "Player",
  All: "All",
};

const NotificationType = {
  RealTime: "RealTime",
  Schedule: "Schedule",
};

const NotificationEvents = ["BookingCreated", "NewMessage"];

export default ({ onClose, notification }) => {
  const [{ data, loading, error }, doCreate] = useAxios(
    {
      url: "/scheduledNotification/create",
      method: "POST",
    },
    { manual: true }
  );

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Create ScheduledNotification
      </DialogTitle>
      <Formik
        initialValues={{
          id: notification?._id,
          timeSpan: notification?.timeSpan || "",
          userType: notification?.userType || NotificationsUserType.All,
          body: notification?.body || "",
          type: notification?.type || NotificationType.RealTime,
          schedule: NotificationType.RealTime,
          event: notification?.event || null,
        }}
        validate={(values) => {
          const errors = {};

          if (!values.body) {
            errors.body = "Required";
          } else if (values.body.length > 30) {
            errors.body = "Notification has to be less than 20 characters";
          }

          if (values.type === NotificationType.RealTime && !values.event) {
            errors.event = "Required";
          }

          if (values.type === NotificationType.Schedule && !values.timeSpan) {
            errors.timeSpan = "Required";
          }

          return errors;
        }}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          doCreate({ data: values }).then(() => onClose("CREATED"));
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
          setFieldValue,
        }) => {
          return (
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
                      type="email"
                      label="Body"
                      margin="normal"
                      fullWidth={true}
                      multiline
                      name="body"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.body}
                      helperText={touched.body && errors.body}
                      error={Boolean(touched.body && errors.body)}
                    />
                  </div>

                  <div className="form-group">
                    <FormControl fullWidth>
                      <InputLabel id="user-type-select">User Type</InputLabel>
                      <Select
                        labelId="user-type-select"
                        name="userType"
                        fullWidth
                        value={values.userType}
                        onChange={handleChange}
                        helperText={touched.userType && errors.userType}
                        error={Boolean(touched.userType && errors.userType)}
                      >
                        <MenuItem value={NotificationsUserType.All}>
                          {NotificationsUserType.All}
                        </MenuItem>
                        <MenuItem value={NotificationsUserType.Coach}>
                          {NotificationsUserType.Coach}
                        </MenuItem>
                        <MenuItem value={NotificationsUserType.Player}>
                          {NotificationsUserType.Player}
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="form-group">
                    <ButtonGroup variant="contained" value={values.type}>
                      <Button
                        color={
                          values.type === NotificationType.RealTime
                            ? "primary"
                            : "default"
                        }
                        onClick={() =>
                          setFieldValue("type", NotificationType.RealTime)
                        }
                      >
                        {NotificationType.RealTime}
                      </Button>
                      <Button
                        color={
                          values.type === NotificationType.Schedule
                            ? "primary"
                            : "default"
                        }
                        onClick={() =>
                          setFieldValue("type", NotificationType.Schedule)
                        }
                      >
                        {NotificationType.Schedule}
                      </Button>
                    </ButtonGroup>
                  </div>

                  {values.type === NotificationType.Schedule && (
                    <div className="form-group">
                      <FormControl
                        error={Boolean(touched.timeSpan && errors.timeSpan)}
                      >
                        <RadioGroup
                          name="timeSpan"
                          value={values.timeSpan}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value={NotificationsTimeSpans.daily}
                            control={<Radio />}
                            label={capitalize(NotificationsTimeSpans.daily)}
                          />
                          <FormControlLabel
                            value={NotificationsTimeSpans.weekly}
                            control={<Radio />}
                            label={capitalize(NotificationsTimeSpans.weekly)}
                          />
                          <FormControlLabel
                            value={NotificationsTimeSpans.monthly}
                            control={<Radio />}
                            label={capitalize(NotificationsTimeSpans.monthly)}
                          />
                          <FormHelperText>
                            {touched.timeSpan && errors.timeSpan}
                          </FormHelperText>
                        </RadioGroup>
                      </FormControl>
                    </div>
                  )}

                  {values.type === NotificationType.RealTime && (
                    <FormControl
                      error={Boolean(touched.event && errors.event)}
                      fullWidth
                    >
                      <InputLabel id="notification-event">On Event</InputLabel>
                      <Select
                        labelId="notification-event"
                        name="event"
                        fullWidth
                        value={values.event}
                        onChange={handleChange}
                      >
                        {NotificationEvents.map((e) => {
                          return (
                            <MenuItem key={e} value={e}>
                              {e}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      <FormHelperText>
                        {touched.event && errors.event}
                      </FormHelperText>
                    </FormControl>
                  )}
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  disabled={loading}
                  style={{ opacity: loading ? 0.5 : 1 }}
                  autoFocus
                  onClick={() => onClose()}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  disabled={loading}
                  style={{ opacity: loading ? 0.5 : 1 }}
                  onClick={handleSubmit}
                  color="primary"
                >
                  Create
                </Button>
              </DialogActions>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

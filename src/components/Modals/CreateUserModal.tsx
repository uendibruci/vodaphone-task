import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createUser } from "@/api/usersApi";
import { CreateUserModalProps } from "@/interfaces";

const validationSchema = Yup.object({
  firstName: Yup.string(),
  username: Yup.string().required("Username is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  zipcode: Yup.string()
    .matches(/^\d+$/, "Zip code should contain only digits")
    .required("Phone is required"),
  phone: Yup.string()
    .matches(/^[\d.-]+$/, "Phone number should contain only digits")
    .required("Phone is required"),
});

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  fetchUsers,
}) => {
  const initialValues = {
    firstName: "",
    username: "",
    street: "",
    city: "",
    email: "",
    zipcode: "",
    phone: "",
  };

  const handleCreateUser = async (values: typeof initialValues) => {
    const min = 1;
    const max = 1000;
    const generatedId = Math.floor(Math.random() * (max - min + 1)) + min;

    try {
      await createUser({
        name: values.firstName,
        username: values.username,
        id: generatedId,
        address: {
          street: values.street,
          zipcode: values.zipcode,
          city: values.city,
        },
        phone: values.phone,
        email: values.email,
      });
      onClose();
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { mt: "135px", verticalAlign: "top", color: "#4E5964" },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: 18,
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
        }}
      >
        New User Info
        <IconButton
          onClick={onClose}
          sx={{
            marginLeft: "auto",
            position: "absolute",
            right: "5px",
            top: "5px",
          }}
        >
          <img src={CloseIcon} alt="Close" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateUser}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent sx={{ fontSize: 14 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    fullWidth
                    size="small"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                  <Field
                    as={TextField}
                    name="street"
                    size="small"
                    label="Street"
                    fullWidth
                    error={touched.street && Boolean(errors.street)}
                    helperText={touched.street && errors.street}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    size="small"
                    error={touched.city && Boolean(errors.city)}
                    helperText={touched.city && errors.city}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    fullWidth
                    size="small"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="username"
                    label="Username"
                    fullWidth
                    size="small"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                  <Field
                    as={TextField}
                    name="zipcode"
                    label="Zipcode"
                    fullWidth
                    size="small"
                    error={touched.zipcode && Boolean(errors.zipcode)}
                    helperText={touched.zipcode && errors.zipcode}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                  <Field
                    as={TextField}
                    name="phone"
                    label="Phone"
                    fullWidth
                    size="small"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    inputProps={{ style: { fontSize: "12px" } }}
                    sx={{ mb: 3 }}
                    InputLabelProps={{ sx: { fontSize: "12px" } }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="error"
                type="submit"
                sx={{ margin: "10px", textTransform: "capitalize" }}
              >
                Create
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateUserModal;

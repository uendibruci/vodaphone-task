import React, { useState, useEffect } from "react";
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
import { fetchUserById, updateUser } from "@/api/usersApi";
import { UpdateUserModalProps, User } from "@/interfaces";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  firstName: Yup.string(),
  username: Yup.string(),
  street: Yup.string(),
  city: Yup.string(),
  email: Yup.string()
    .email("Invalid email address"),
  zipcode: Yup.string()
    .matches(/^\d+$/, "Zip code should contain only digits"),
  phone: Yup.string()
    .matches(/^[\d.-]+$/, "Phone number should contain only digits"),
});


const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  open,
  onClose,
  fetchUsers,
  id,
}) => {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    username: "",
    street: "",
    city: "",
    email: "",
    zipcode: "",
    phone: "",
  });

  const [userDetails, setUserDetails] = useState<User | null>();

  const fetchUserDetails = async (userId: number) => {
    try {
      const userDetails = await fetchUserById(userId);
      setUserDetails(userDetails);
    } catch (error) {
      toast.error("Error fetching user details. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (userDetails)
      setInitialValues({
        firstName: userDetails.name,
        username: userDetails.username,
        street: userDetails.address?.street,
        city: userDetails.address?.city,
        email: userDetails.email,
        zipcode: userDetails.address?.zipcode,
        phone: userDetails.phone,
      });
  }, [open, userDetails]);

  const handleUpdateUser = async (values: typeof initialValues) => {
    try {
      if (id)
        await updateUser(id, {
          name: values.firstName,
          username: values.username,
          address: {
            street: values.street,
            zipcode: values.zipcode,
            city: values.city,
          },
          phone: values.phone,
          email: values.email,
        });
      fetchUsers();
      onClose();
    } catch (error) {
      toast.error("Error updating user. Please try again.");
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
        Edit User
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
        onSubmit={handleUpdateUser}
        enableReinitialize={true}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent sx={{ fontSize: 14 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="Full Name"
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
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default UpdateUserModal;

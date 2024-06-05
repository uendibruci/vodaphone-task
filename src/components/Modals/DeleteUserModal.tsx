import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import { DeleteUserModalProps } from "@/interfaces";

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  open,
  onClose,
  onConfirmDelete,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          mt: "135px",
          verticalAlign: "top",
          color: "#4E5964",
        },
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
        Delete User
        <IconButton
          onClick={onClose}
          sx={{
            marginLeft: "auto",
            position: "absolute",
            right: "5px",
            top: "5px",
          }}
        >
          <img src={CloseIcon} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ fontSize: 14 }}>
        Are you sure you want to delete this user?
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirmDelete}
          sx={{ margin: "10px" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUserModal;

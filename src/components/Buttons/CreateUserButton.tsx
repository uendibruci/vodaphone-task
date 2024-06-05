import React from "react";
import { Button } from "@mui/material";
import AddIcon from "../../../assets/icons/add-icon.svg";

type ButtonProps = {
  setCreateUserModalOpen: () => void;
};

const CreateUserButton: React.FC<ButtonProps> = ({
  setCreateUserModalOpen,
}) => {
  return (

      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: "capitalize" }}
        onClick={setCreateUserModalOpen}
        startIcon={<img src={AddIcon} alt="Add Icon" />}
      >
        Create New User
      </Button>

  );
};

export default CreateUserButton;

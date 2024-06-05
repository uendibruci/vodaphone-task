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
    <div className="flex justify-end pb-5">
      <Button
        variant="contained"
        color="error"
        sx={{ textTransform: "capitalize" }}
        onClick={setCreateUserModalOpen}
        startIcon={<img src={AddIcon} alt="Add Icon" />}
      >
        Create New User
      </Button>
    </div>
  );
};

export default CreateUserButton;

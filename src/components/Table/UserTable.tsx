import React, { useState } from "react";
import {  UserTableProps } from "@/interfaces";
import UserTableRow from "@/components/Table/UserTableRow";
import UserTableHeader from "@/components/Table/UserTableHeader";
import DeleteUserModal from "@/components/Modals/DeleteUserModal";
import UpdateUserModal from "../Modals/UpdateUserModal";
import { deleteUser } from "@/api/usersApi";

const UserTable: React.FC<UserTableProps> = ({ users, fetchUsers }) => {
  const [deletedUserId, setDeletedUserId] = useState<number | null>(null);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [id, setId] = useState<number>();

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
  };

  const openEditUserModal = (userId: number) => {
    setId(userId);
    setShowEditUserModal(true);
  };

  const handleCloseModal = () => {
    setDeletedUserId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deletedUserId !== null) {
        await deleteUser(deletedUserId);
      }
      handleCloseModal();
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <table className="w-full table-auto border-separate border-spacing-y-[10px]">
        <UserTableHeader />
        <tbody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onEdit={() => openEditUserModal(user.id)}
              onDelete={() => setDeletedUserId(user.id)}
            />
          ))}
        </tbody>
      </table>
      <DeleteUserModal
        open={deletedUserId !== null}
        onClose={handleCloseModal}
        onConfirmDelete={handleConfirmDelete}
      />
      <UpdateUserModal
        onClose={handleCloseEditUserModal}
        fetchUsers={fetchUsers}
        open={showEditUserModal}
        id={id}
      />
    </>
  );
};

export default UserTable;

import React from "react";
import { User } from "@/interfaces";
import editIcon from "../../../assets/icons/edit-icon.svg";
import deleteIcon from "../../../assets/icons/delete-icon.svg";

interface UserTableRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
}

const UserTableRow: React.FC<UserTableRowProps> = ({ user, onEdit, onDelete }) => {
  return (
    <tr key={user.id} className="border hover:bg-gray-50 h-[45px]">
      <td className="border-y border-l py-3 px-4 rounded-l-md">{user.id}</td>
      <td className="border-y px-4">{user.name}</td>
      <td className="border-y px-4">{user.email}</td>
      <td className="border-y px-4 hidden sm:table-cell">{user.phone}</td>
      <td className="border-y border-r px-4 rounded-r-md">
        <div className="flex justify-end">
          <img
            src={editIcon}
            onClick={() => onEdit(user)}
            alt="Edit"
            className="p-3 cursor-pointer"
          />
          <img
            src={deleteIcon}
            onClick={() => onDelete(user.id)}
            alt="Delete"
            className="pl-3 cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default UserTableRow;

import React from "react";

const UserTableHeader: React.FC = () => {
  return (
    <thead>
      <tr>
        <th className="py-2 px-4 text-left">ID</th>
        <th className="py-2 px-4 text-left">Name</th>
        <th className="py-2 px-4 text-left">Email</th>
        <th className="py-2 px-4 text-left hidden sm:table-cell">Phone</th>
        <th className="py-2 px-4 text-right">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/api/usersApi";
import { User } from "@/interfaces";
import UserTable from "@/components/Table/UserTable";
import CreateUserModal from "@/components/Modals/CreateUserModal";
import CreateUserButton from "@/components/Buttons/CreateUserButton";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container m-5 w-full sm:w-[1220px] max-w-[100vw]">
      <CreateUserButton
        setCreateUserModalOpen={() => setCreateUserModalOpen(true)}
      />
      <UserTable users={users} fetchUsers={getUsers} />
      <CreateUserModal
        open={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        fetchUsers={getUsers}
      />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { fetchUsers } from "@/api/usersApi";
import { User } from "@/interfaces";
import UserTable from "@/components/Table/UserTable";
import CreateUserModal from "@/components/Modals/CreateUserModal";
import CreateUserButton from "@/components/Buttons/CreateUserButton";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);

  const getUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      toast.error("Error fetching users. Please try again.");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-5 sm:w-[1220px]">
      <div className="flex justify-end mb-4">
        <CreateUserButton
          setCreateUserModalOpen={() => setCreateUserModalOpen(true)}
        />
      </div>
      <div className="overflow-x-auto">
        <UserTable users={users} fetchUsers={getUsers} />
      </div>
      <CreateUserModal
        open={createUserModalOpen}
        onClose={() => setCreateUserModalOpen(false)}
        fetchUsers={getUsers}
      />
    </div>
  );
};

export default Home;

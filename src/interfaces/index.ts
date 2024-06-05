export interface Address {
    street: string;
    city: string;
    zipcode: string;
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
  }

  export interface UserTableProps {
    users: User[];
    fetchUsers: () => void;
  }

  export interface DeleteUserModalProps {
    open: boolean;
    onClose: () => void;
    onConfirmDelete: () => void;
  }
  
  export interface CreateUserModalProps {
    open: boolean;
    onClose: () => void;
    fetchUsers: () => void;
  }

  export interface UpdateUserModalProps {
    open: boolean;
    id?: number;
    onClose: () => void;
    fetchUsers: () => void;
  }
  
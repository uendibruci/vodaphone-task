import { User } from "@/interfaces";
import axios from "axios";
import { toast } from 'react-toastify';


const API_URL = "http://localhost:8000/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserById = async (userId: number) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user: User) => {
  try {
    const response = await axios.post(API_URL, user);
    toast.success("User created successfully!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (userId: number, user: any) => {
  try {
    const response = await axios.patch(`${API_URL}/${userId}`, user);
    toast.success("User updated successfully!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    toast.success("User deleted successfully!");
  } catch (error) {
    throw error;
  }
};

import { User } from "@/interfaces";
import axios from "axios";

const API_URL = "http://localhost:8000/users";

export const fetchUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchUserById = async (userId: number) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

export const createUser = async (user: User) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (userId: number, user: any) => {
  const response = await axios.patch(`${API_URL}/${userId}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

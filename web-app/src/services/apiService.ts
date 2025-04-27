import axios from "axios";
import { User } from "../types/User";

// Create an axios instance with default settings
const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, // optional: if you need cookies/auth
});

const userID = 1;

// Example function: fetch groups for the current user
export const testAPI = async () => {
    const response = await api.get("/");
    return response.data;
  };

export const createUser = async (name: String) => {
  const userData = {
    groups: [],
    totalOwed: 0,
    totalPaid: 0,
    firstName: 'John',
    lastName: 'Doe',
    email: 'email.com',
    phone: '123456789',
    balance: 0,
  }

  const response = await api.post("/user", userData);
  return response.data;
};

// Example function: fetch groups for the current user
export const fetchUserGroups = async () => {
  const response = await api.get("/user");
  return response.data;
};

// Example function: create a new group
export const createGroup = async (groupData: any) => {
  const response = await api.post("/group", groupData);
  return response.data;
};

// Example function: update a group's balance
export const updateGroupBalance = async (groupId: string, balance: number) => {
  const response = await api.put(`/groups/${groupId}/balance`, { balance });
  return response.data;
};

// Create a new subgroup
export const createSubgroup = async (groupId: string, subgroupData: any) => {
  const response = await api.post(`/groups/${groupId}/subgroups`, subgroupData);
  return response.data;
};

// Export the whole instance if you want
export default api;

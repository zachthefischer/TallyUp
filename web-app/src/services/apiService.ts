import axios from "axios";
import { User } from "../types/User";

// Create an axios instance with default settings
const api = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true, // optional: if you need cookies/auth
});

// Example function: fetch groups for the current user
export const testAPI = async () => {
    const response = await api.get("/");
    return response.data;
  };

export const createUser = async (firstName: string, lastName: string) => {
  const userData = {
    firstName: firstName,
    lastName: lastName,
    email: 'email.com',
    phone: '123456789',
    balance: 0,
  }

  const response = await api.post("/user", userData);
  return response.data;
};
  

// Create a new group
export const createGroup = async (groupName: string, userId: string, isAdmin: boolean) => {
  const groupData = {
    name: groupName,
    total: 0,
    paid: 0,
    owed: 0,
    percentage: 0,
    members: [],
    subGroups: [],
  };
  const group = await api.post("/group", groupData);
  const groupId = group.data._id;

  console.log("User ID: ", userId);
  console.log("Group ID: ", groupId);

  const response = await api.post("/pair/add", {userId: userId, groupId: groupId, isAdmin: isAdmin});
  return response.data;
};

// Create a new transaction
export const createTransaction = async (userId: string, groupId: string, amount: number, description: string) => {
  console.log("Called createTransaction");
  const transactionInput = {
    userId: userId,
    groupId: groupId,
    amount: amount,
    description: description
  };
  console.log("Calling API with: ", transactionInput);
  const response = await api.post("/pair", transactionInput);
  console.log("Response: ", response.data);
  return response.data.user;
}

export const createSubGroup = async (groupId: string, subGroupName: string ) => {
  console.log("Group ID: ", groupId);
  const response = await api.post(`/group/subgroup`, { groupId, subGroupName });
  return response.data;
}

// Example function: fetch groups for the current user
export const fetchUserGroups = async (userId: string) => {
  console.log(`${userId}`);
  const response = await api.get(`/user/${userId}`);
  console.log(response.data.groups);
  return response.data.groups;
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

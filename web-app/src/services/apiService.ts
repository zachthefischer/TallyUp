import axios from "axios";

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

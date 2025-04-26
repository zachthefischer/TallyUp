import { Transaction } from "./Transaction";

// Define how the user stores groups
export interface UserGroups {
    groupId: string;
    groupName: string;
    isAdmin: boolean;

    balance: number;
    transactions: Transaction[];
    requests: Transaction[];

    supGroups ?: UserGroups[];
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    totalOwed: number;
    totalPaid: number;
    balance: number;

    groups: UserGroups[];
}
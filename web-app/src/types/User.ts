import { Transaction } from "./Transaction";

// Define how the user stores groups
export interface UserGroup {
    _id: string;
    groupId: string;
    groupName: string;
    isAdmin: boolean;

    paid: number;
    owed: number;
    balance: number;
    transactions: Transaction[];
    requests: Transaction[];

    subGroups ?: UserGroup[];
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    totalOwed: number;
    totalPaid: number;
    balance: number;

    groupsOwed: UserGroup[];
}
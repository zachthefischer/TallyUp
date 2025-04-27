export interface GroupMember {
  _id: string;
  userName: string;
  transaction: string;
  timeAgo: string;
  paid: number;
  owed: number;
  balance: number;
}

export interface Group {
  _id: string;
  name: string;
  paid: number;
  owed: number;
  balance: number;

  members: GroupMember[];
  subGroups: Group[];
}
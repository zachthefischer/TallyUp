export interface GroupMember {
  id: string;
  name: string;
  transaction: string;
  timeAgo: string;
  amount: number;
}

export interface Group {
  id: string;
  name: string;
  paid: number;
  owed: number;

  members: GroupMember[];
  subGroups: Group[];
}
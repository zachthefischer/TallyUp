import { Member } from './Members';

export interface SubGroup {
  id: number;
  name: string;
  members: Member[];
}

export interface Group {
  id: number;
  name: string;
  amountToReimburse: number;
  percentPaid: number;
  subGroups: SubGroup[];
}

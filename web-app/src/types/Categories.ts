import { Member } from './Members';

export interface SubCategory {
  id: number;
  name: string;
  members: Member[];
}

export interface Category {
  id: number;
  name: string;
  amountToReimburse: number;
  percentPaid: number;
  subCategories: SubCategory[];
}

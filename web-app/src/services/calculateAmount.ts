import { GroupMember } from "../types/Group";

// they owe money:       + owed
// they are owed money:  - owed
// they have paid money: + paid
// they have been paid:  - paid

export function calculateAmount(member: GroupMember) : number {
    let amount = member.userOwed;
    return amount;
}

export function calculatePercentage(member: GroupMember) : number {
    let amount =  (Math.abs(member.userOwed) + Math.abs(member.userPaid));
    if (amount === 0) {
        return 100;
    } else {
        return (member.userPaid / (Math.abs(member.userOwed) + Math.abs(member.userPaid)) * 100);
    }
}
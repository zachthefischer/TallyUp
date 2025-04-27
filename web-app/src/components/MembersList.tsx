import { DollarSign, CreditCard, ArrowDown, ArrowUp, Minus, Plus } from "lucide-react";
import { GroupMember } from "../types/Group";
import { calculateAmount } from "../services/calculateAmount";
import { Dispatch, SetStateAction } from "react";
import { UserGroup } from "../types/User";

interface MembersListProps {
  setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
  members: GroupMember[];
  group: UserGroup;
  onEditMembers: () => void;
}

function MembersList({ members, group, onEditMembers, setShowPaymentModal }: MembersListProps) {
  // they owe money: + owed
  // they are owed money: - owed
  // they have paid money: + paid
  // they have been paid: - paid
  
  const membersWhoOwe = members.filter(member => calculateAmount(member) < 0);
  const membersOwed = members.filter(member => calculateAmount(member) > 0);
  const membersEven = members.filter(member => calculateAmount(member) == 0);

  console.log("Members: ", members);

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{group.groupName}</h2>
        </div>
        <button
          onClick={onEditMembers}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-all duration-200"
        >
          Edit Members
        </button>
      </div>

      {membersWhoOwe.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-red-600 font-medium">
            <ArrowDown size={18} />
            <h3 className="text-lg">Members Who Owe Money</h3>
          </div>
          <div className="space-y-3">
            {membersWhoOwe.map((member) => (
              <div 
                key={member._id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-red-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-red-500 text-lg">
                    -${Math.abs(calculateAmount(member))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {membersOwed.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-green-600 font-medium">
            <ArrowUp size={18} />
            <h3 className="text-lg">Reimbursements to Process</h3>
          </div>
          <div className="space-y-3">
            {membersOwed.map((member) => (
              <div 
                key={member._id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-green-500 text-lg">
                    +${Math.abs(calculateAmount(member))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {membersEven.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-gray-500 font-medium">
            <Minus size={18} />
            <h3 className="text-lg">Other Users</h3>
          </div>
          <div className="space-y-3">
            {membersEven.map((member) => (
              <div 
                key={member._id}
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-green-500 text-lg">
                    +${Math.abs(calculateAmount(member))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 flex-col">
      <div className="flex gap-4 mb-6">
            <button 
                className="flex-1 px-4 py-3 bg-[#396e7c] text-white rounded-lg font-semibold text-base hover:bg-[#396e7c]/90 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowPaymentModal(group)}>
                <Plus size={20} />
                Submit Request
                </button>
            <button 
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-base hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowPaymentModal(group)}>
                <Plus size={18} />
                Submit Payment
            </button>
            <button 
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => {}}>
                <CreditCard size={18} />
                Reimburse All
            </button>
        </div>
      </div>
    </div>
  );
}

export default MembersList;
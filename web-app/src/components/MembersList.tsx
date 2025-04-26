import { DollarSign, CreditCard, ArrowDown, ArrowUp } from "lucide-react";
import { Member } from "../types/Members";

interface MembersListProps {
  members: Member[];
  groupName: string;
  subCategoryName: string;
  onEditMembers: () => void;
}

function MembersList({ members, groupName, subCategoryName, onEditMembers }: MembersListProps) {
  const membersWhoOwe = members.filter(member => member.amount < 0);
  const membersOwed = members.filter(member => member.amount > 0);

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{groupName}</h2>
          <p className="text-gray-600 mt-1">{subCategoryName}</p>
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
                key={member.id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-red-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-red-500 text-lg">
                    -${Math.abs(member.amount)}
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
                key={member.id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-green-500 text-lg">
                    +${Math.abs(member.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
          <DollarSign size={18} />
          Process Reimbursements
        </button>
        <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
          <CreditCard size={18} />
          Settle All
        </button>
      </div>
    </div>
  );
}

export default MembersList;
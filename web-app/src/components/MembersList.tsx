import { DollarSign, CreditCard, ArrowDown, ArrowUp, Minus, Plus, X } from "lucide-react";
import { GroupMember } from "../types/Group";
import { calculateAmount } from "../services/calculateAmount";
import { Dispatch, SetStateAction } from "react";
import { UserGroup } from "../types/User";
import "./subpages/Subpages.css";

interface MembersListProps {
  setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
  members: GroupMember[];
  group: UserGroup;
  onEditMembers: () => void;
  onClose?: () => void;
}

function MembersList({ members, group, onEditMembers, setShowPaymentModal, onClose }: MembersListProps) {
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
        <div className="flex items-center gap-2">
          <button
            onClick={onEditMembers}
            className="action-button action-button-secondary"
          >
            Edit Members
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="close-button"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {membersWhoOwe.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-[#98351b] font-medium">
            <ArrowDown size={18} />
            <h3 className="text-lg">Members Who Owe Money</h3>
          </div>
          <div className="space-y-3">
            {membersWhoOwe.map((member) => (
              <div 
                key={member._id} 
                className="p-4 border border-[#98351b] rounded-lg border-l-4 border-l-[#98351b] hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-[#98351b]">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-[#98351b] text-lg">
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
          <div className="flex items-center gap-2 mb-4 text-[#396e7c] font-medium">
            {/* <ArrowUp size={18} /> */}
            <h3 className="text-lg">Reimbursements to Process</h3>
          </div>
          <div className="space-y-3">
            {membersOwed.map((member) => (
              <div 
                key={member._id} 
                className="p-4 border border-[#396e7c] rounded-lg border-l-4 border-l-[#396e7c] hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-[#396e7c]">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-[#396e7c] text-lg">
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
          <div className="flex items-center gap-2 mb-4 text-[#082341] font-medium">
            <Minus size={18} />
            <h3 className="text-lg">Other Users</h3>
          </div>
          <div className="space-y-3">
            {membersEven.map((member) => (
              <div 
                key={member._id}
                className="p-4 border border-[#082341] rounded-lg border-l-4 border-l-[#082341] hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-[#082341]">{member.userName}</div>
                    {/* <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div> */}
                  </div>
                  <div className="font-semibold text-[#082341] text-lg">
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
                className="flex-1 action-button action-button-teal"
                onClick={() => setShowPaymentModal(group)}>
                <Plus size={20} />
                Submit Request
                </button>
            <button 
                className="flex-1 action-button action-button-teal"
                onClick={() => setShowPaymentModal(group)}>
                <Plus size={18} />
                Submit Payment
            </button>
            <button 
                className="flex-1 action-button action-button-dark"
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
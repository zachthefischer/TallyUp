import { ArrowDown, ArrowUp, Minus, Plus, CreditCard } from "lucide-react";
import { UserGroup } from "../../types/User";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import GroupBanner from "../../components/GroupBanner";
import './Subpages.css';
import { getGroupById } from "../../services/apiService";
import { Group, GroupMember } from "../../types/Group";
import { calculateAmount } from "../../services/calculateAmount";

interface EventSelectProps {
    activeGroup: UserGroup | null;
    activeSubGroup: UserGroup | null;
    setActiveSubGroup: Dispatch<SetStateAction<UserGroup | null>>;
    activeSubSubGroup: UserGroup | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<UserGroup | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
    setShowAddPairModal: Dispatch<SetStateAction<UserGroup | null>>;
    setShowBalanceSheet: Dispatch<SetStateAction<boolean>>;
    setShowAddSubgroupModal: Dispatch<SetStateAction<number>>;
    setSelectedGroupForSubgroup: Dispatch<SetStateAction<string>>;
}

export default function EventSelect(
    { 
        activeGroup, 
        activeSubGroup, 
        setActiveSubGroup, 
        activeSubSubGroup, 
        setActiveSubSubGroup,
        setShowPaymentModal,
        setShowAddPairModal,
        // setShowBalanceSheet,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    
    }: EventSelectProps) {

    const [group, setGroup] = useState<Group | null>(null);
    console.log("Active group:", activeGroup)

    const [membersWhoOwe, setMembersWhoOwe] = useState<GroupMember[] | null>(null);
    const [membersOwed, setMembersOwed] = useState<GroupMember[] | null>(null);
    const [membersEven, setMembersEven] = useState<GroupMember[] | null>(null);

    useEffect(() => {
        const loadGroups = async () => {
        try {
            if (activeGroup?.groupId) {
                getGroupById(activeGroup?.groupId)
                .then((groupData) => {
                  setGroup(groupData);
                  console.log("Group data", groupData);
              
                  setMembersWhoOwe((groupData?.members || []).filter((member: GroupMember) => calculateAmount(member) < 0));
                  setMembersOwed((groupData?.members || []).filter((member: GroupMember) => calculateAmount(member) > 0));
                  setMembersEven((groupData?.members || []).filter((member: GroupMember) => calculateAmount(member) === 0));
              
                  console.log("Group members:", groupData?.members);
                })
                .catch((error) => {
                  console.error("Error fetching group data:", error);
                });
             }
        } catch (error) {
            console.error("Failed to fetch user groups", error);
        } 
        };
    
        // Uncomment the line below if you want to fetch data from the API
        loadGroups();
    }, [activeGroup]);

    return (
        <div className="event-select-container">
            <div className="event-select-header">
                {activeGroup !== null && <GroupBanner groupName={activeGroup.groupName}/>}
                <div className="buttons-container">
                    <button 
                        className="action-button action-button-dark"
                        onClick={() => setShowPaymentModal(activeGroup)}>
                        <CreditCard size={18} />
                        Request/Payment
                        </button>
                    <button 
                        className="action-button action-button-teal"
                        onClick={() => setShowAddPairModal(activeGroup)}>
                        <Plus size={18} />
                        Invite Member
                    </button>
                    <button 
                        className="action-button action-button-secondary"
                        onClick={() => setShowAddSubgroupModal(1)}>
                        <Plus size={18} />
                        Add Event
                    </button>
                </div>
                {membersWhoOwe?.length > 0 && (
                        <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 text-red-600 font-medium">
                            <ArrowDown size={18} />
                            <h3 className="text-lg">Members Who Owe Money</h3>
                        </div>
                        <div className="space-y-3">
                            {membersWhoOwe?.map((member) => (
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

                    {membersOwed?.length > 0 && (
                        <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 text-gray-600 font-medium">
                            <ArrowUp size={18} />
                            <h3 className="text-lg">Reimbursements to Process</h3>
                        </div>
                        <div className="space-y-3">
                            {membersOwed?.map((member) => (
                            <div 
                                key={member._id} 
                                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-gray-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
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

                    {membersEven?.length > 0 && (
                        <div className="mb-8">
                        <div className="flex items-center gap-2 mb-4 text-gray-500 font-medium">
                            <Minus size={18} />
                            <h3 className="text-lg">Other Users</h3>
                        </div>
                        <div className="space-y-3">
                            {membersEven?.map((member) => (
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
            </div>

        {/* Display list of sub subgroups */}
        <div>
            {activeGroup?.subGroups?.map((subGroup) => (
            <div key={subGroup.groupId} className="p-0">
                <div className="subgroup-item"
                    onClick={() => {setActiveSubGroup(activeSubGroup === subGroup ? null : subGroup)}}>
                    <div 
                        className={`p-4 rounded-lg border-2 border-gray-300 hover:border-[#396e7c] transition-colors duration-150 ease-in-out
                        ${activeSubGroup === subGroup ? "border-[#396e7c] bg-[#396e7c]/10" : "border-[#ffffff]"}`}
                    >
                    <div className="flex items-center justify-between">
                        <span className="subgroup-name"> {subGroup.groupName} </span>
                        <button className="add-subgroup-button" onClick={(e) => {
                            e.stopPropagation();
                            setActiveSubGroup(subGroup);
                            setSelectedGroupForSubgroup(subGroup._id);
                            setShowAddSubgroupModal(2);
                        }}>
                            <Plus size={18} />
                            Add sub group
                        </button>
                    </div>
                   
                </div>
            </div>
            
            {/* Display list of subSubGroups - eg Cars for Retreat for UPE */}
            {activeSubGroup === subGroup &&  ( /* activeSubGroup?.subGroups?.length > 0 && */
                <div className="subsubgroup-list">
                {subGroup?.subGroups?.map((subSubGroup) => (
                    <div
                    key={subSubGroup._id}
                    className={`subsubgroup-item ${activeSubSubGroup?._id === subSubGroup?._id ? "active" : ""}`}
                    onClick={() => setActiveSubSubGroup(activeSubSubGroup?._id === subSubGroup?._id ? null : subSubGroup)}>
                    <div className="flex items-center justify-between">
                        <div className="subsubgroup-name"> {subSubGroup.groupName} </div>
                        <div className="subsubgroup-members">
                            {/* FIX THIS */}
                            {subSubGroup.transactions.length} member{subSubGroup.transactions.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
            </div>
        ))}
        </div>
        </div>
    )
}
import { ArrowDown, ArrowUp, Minus, Plus } from "lucide-react";
import { UserGroup } from "../../types/User";
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import GroupBanner from "../../components/GroupBanner";
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
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6">
                {activeGroup !== null && <GroupBanner groupName={activeGroup.groupName}/>}
                <div className="flex gap-4 mb-6">
                    <button 
                        className="flex-1 px-4 py-3 bg-[#396e7c] text-white rounded-lg font-semibold text-base hover:bg-[#396e7c]/90 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                        onClick={() => setShowPaymentModal(activeGroup)}>
                        <Plus size={20} />
                        Request/Payment
                        </button>
                    <button 
                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                        onClick={() => setShowAddPairModal(activeGroup)}>
                        <Plus size={18} />
                        Invite Member
                    </button>
                    <button 
                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
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
        <div className="border-t border-gray-200">
            {activeGroup?.subGroups?.map((subGroup) => (
            <div key={subGroup.groupId} className="p-4">
                <div className="flex flex-col gap-4 cursor-pointer"
                    onClick={() => {setActiveSubGroup(activeSubGroup === subGroup ? null : subGroup)}}>
                    <div 
                        className={`p-4 rounded-lg border-2 border-gray-300 hover:border-[#396e7c] transition-colors duration-150 ease-in-out
                        ${activeSubGroup === subGroup ? "border-[#396e7c] bg-[#396e7c]/10" : "border-[#ffffff]"}`}
                    >
                    <div className="flex items-center justify-between">
                        <span 
                        className="font-medium text-gray-800 flex-1"
                        
                        >
                        {subGroup.groupName}
                        </span>
                        <button
                        className="p-2 hover:bg-[#396e7c]/10 rounded-lg transition-colors duration-150 flex items-center gap-2 text-gray-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveSubGroup(subGroup);
                            setSelectedGroupForSubgroup(subGroup._id);
                            setShowAddSubgroupModal(2);
                        }}
                        >
                        <Plus size={18} />
                        Add sub group
                        </button>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span className="whitespace-nowrap"><span className="font-semibold">${subGroup.balance}</span> to reimburse</span>
                        <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        {/* TODO - there should be a total due  */}
                            <div
                                className="absolute top-0 left-0 h-full bg-[#396e7c] transition-all duration-500 ease-out" 
                                style={{ width: `${subGroup.owed}%` }}
                            ></div>
                        </div>
                        <span className="whitespace-nowrap">{subGroup.owed}% paid</span>
                    </div>
                </div>
            </div>
            
            {/* Display list of subSubGroups - eg Cars for Retreat for UPE */}
            {activeSubGroup === subGroup && activeSubGroup?.subGroups?.length > 0 && (
                <div className={`mt-2 ml-4 space-y-2`}>
                {subGroup?.subGroups?.map((subSubGroup) => (
                    <div
                    key={subSubGroup._id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                        ${activeSubSubGroup?._id === subSubGroup?._id ? 
                        "bg-gray-100 border-l-4 border-l-[#396e7c]" : ""
                        }`}
                    onClick={() => setActiveSubSubGroup(activeSubSubGroup?._id === subSubGroup?._id ? null : subSubGroup)}>
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-gray-700">
                            {subSubGroup.groupName}
                        </div>
                        <div className="text-xs text-gray-500">
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
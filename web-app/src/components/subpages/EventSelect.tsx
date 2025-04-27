import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Group } from "../../types/Group";
import { Dispatch, SetStateAction } from 'react';
import GroupBanner from "../../components/GroupBanner";

interface EventSelectProps {
    activeGroup: Group | null;
    activeSubGroup: Group | null;
    setActiveSubGroup: Dispatch<SetStateAction<Group | null>>;
    activeSubSubGroup: Group | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<Group | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<boolean>>;
    setShowBalanceSheet: Dispatch<SetStateAction<boolean>>;
    setShowAddGroupModal: Dispatch<SetStateAction<boolean>>;
    setShowAddSubgroupModal: Dispatch<SetStateAction<boolean>>;
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
        setShowBalanceSheet,
        setShowAddGroupModal,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    
    }: EventSelectProps) {


    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
        {activeGroup !== null && <GroupBanner groupName={activeGroup.name}/>}
        
        <div className="flex gap-4 mb-6">
            <button 
                className="flex-1 px-4 py-3 bg-[#396e7c] text-white rounded-lg font-semibold text-base hover:bg-[#396e7c]/90 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowPaymentModal(true)}>
                <Plus size={20} />
                Add Payment
                </button>
            <button 
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowBalanceSheet(true)}>
                <CreditCard size={18} />
                Transactions
            </button>
            <button 
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-base hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowAddGroupModal(true)}>
                <Plus size={18} />
                Add Group
            </button>
        </div>
        </div>

        <div className="border-t border-gray-200">
        {activeGroup?.subGroups.map((group) => (
            <div key={group.id} className="p-4">
            <div className="flex flex-col gap-4">
                <div 
                className={`p-4 rounded-lg border-2 border-gray-300 hover:border-[#396e7c] transition-colors duration-150 ease-in-out
                    ${activeSubGroup === group ? "border-[#396e7c] bg-[#396e7c]" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span 
                    className="font-medium text-gray-800 flex-1 cursor-pointer"
                    onClick={() => setActiveSubGroup(activeSubGroup === group ? null : group)}
                    >
                    {group.name}
                    </span>
                    <button
                    className="p-2 hover:bg-[#396e7c]/10 rounded-lg transition-colors duration-150 flex items-center gap-2 text-gray-700"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroupForSubgroup(group.name);
                        setShowAddSubgroupModal(true);
                    }}
                    >
                    <Plus size={18} />
                    Add Subgroup
                    </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                    <span className="whitespace-nowrap"><span className="font-semibold">${group.owed}</span> to reimburse</span>
                    <div className="flex items-center gap-2 ml-auto">
                        <div className="relative w-72 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                            className="absolute top-0 left-0 h-full bg-[#396e7c] transition-all duration-500 ease-out" 
                            style={{ width: `${group.paid}%` }}
                        ></div>
                        </div>
                        <span className="whitespace-nowrap">{group.paid}%</span>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Display list of subSubGroups - eg Cars for Retreat for UPE */}
            {activeSubGroup?.id === activeSubGroup?.id && (
                <div className="mt-2 ml-4 space-y-2">
                {group?.subGroups?.map((subSubGroup) => (
                    <div
                    key={subSubGroup.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                        ${activeSubSubGroup?.id === subSubGroup?.id ? 
                        "bg-gray-100 border-l-4 border-l-[#396e7c]" : ""
                        }`}
                    onClick={() => setActiveSubSubGroup(activeSubSubGroup?.id === subSubGroup?.id ? null : subSubGroup)}
                    >
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-gray-700">{subSubGroup.name}</div>
                        <div className="text-xs text-gray-500">
                        {subSubGroup.members.length} member{subSubGroup.members.length !== 1 ? 's' : ''}
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
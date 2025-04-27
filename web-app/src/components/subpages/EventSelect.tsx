import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { UserGroup } from "../../types/User";
import { Dispatch, SetStateAction } from 'react';
import GroupBanner from "../../components/GroupBanner";

interface EventSelectProps {
    activeGroup: UserGroup | null;
    activeSubGroup: UserGroup | null;
    setActiveSubGroup: Dispatch<SetStateAction<UserGroup | null>>;
    activeSubSubGroup: UserGroup | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<UserGroup | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<boolean>>;
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
        setShowBalanceSheet,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    
    }: EventSelectProps) {


    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
            <div className="p-6">
                {activeGroup !== null && <GroupBanner groupName={activeGroup.groupName}/>}
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
                        onClick={() => setShowAddSubgroupModal(1)}>
                        <Plus size={18} />
                        Add Group
                    </button>
                </div>
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
                                style={{ width: `${subGroup.balance}%` }}
                            ></div>
                        </div>
                        <span className="whitespace-nowrap">{subGroup.balance}% paid</span>
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
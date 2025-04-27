import { Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Group } from "../../types/Group";

interface GroupSelectProps {
    groups: Group[];
    activeSubGroup: number | null;
    setActiveSubGroup: Dispatch<SetStateAction<number | null>>;
    activeSubSubGroup: number | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<number | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<boolean>>;
    setShowBalanceSheet: Dispatch<SetStateAction<boolean>>;
    setShowAddGroupModal: Dispatch<SetStateAction<boolean>>;
    setShowAddSubgroupModal: Dispatch<SetStateAction<boolean>>;
    setSelectedGroupForSubgroup: Dispatch<SetStateAction<string>>;
}

export default function GroupSelect(
    { groups, 
        activeSubGroup, 
        setActiveSubGroup, 
        activeSubSubGroup, 
        setActiveSubSubGroup,
        setShowPaymentModal,
        setShowBalanceSheet,
        setShowAddGroupModal,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    }: GroupSelectProps) {


    return (
        <div>
        <div className="p-0">
        <WelcomeBanner />
        
        </div>

        <div>
        {groups.map((group, index) => (
            <div key={group.id} className="py-2 px-0">
            <div className="flex flex-col gap-0">
                <div 
                className={`p-3 rounded-lg border-2 border-gray-300 hover:border-[#396e7c] transition-colors duration-150 ease-in-out bg-white w-full
                    ${activeSubGroup === index ? "border-[#396e7c] bg-[#396e7c]/10" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span 
                    className="font-bold text-xl text-gray-800 flex-1 cursor-pointer"
                    onClick={() => setActiveSubGroup(activeSubGroup === index ? null : index)}
                    >
                    {group.name}
                    </span>
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
            
            {activeSubGroup === index && (
                <div className="mt-2 ml-4 space-y-2">
                {group.subGroups.map((subSubGroup, subIndex) => (
                    <div
                    key={subSubGroup.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                        ${activeSubSubGroup === subIndex ? 
                        "bg-gray-100 border-l-4 border-l-[#396e7c]" : ""
                        }`}
                    onClick={() => setActiveSubSubGroup(activeSubSubGroup === subIndex ? null : subIndex)}
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
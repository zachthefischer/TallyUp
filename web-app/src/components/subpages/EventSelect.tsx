import React, { useState, Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Group } from "../../types/Groups";

interface EventSelectProps {
    groups: Group[];
    activeGroup: number | null;
    setActiveGroup: React.Dispatch<SetStateAction<number | null>>;
    activeSubGroup: number | null;
    setActiveSubGroup: React.Dispatch<SetStateAction<number | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<boolean>>;
    setShowBalanceSheet: Dispatch<SetStateAction<boolean>>;
    setShowAddGroupModal: Dispatch<SetStateAction<boolean>>;
    setShowAddSubgroupModal: Dispatch<SetStateAction<boolean>>;
    setSelectedGroupForSubgroup: Dispatch<SetStateAction<string>>;
}

export default function EventSelect(
    { groups, 
        activeGroup, 
        setActiveGroup, 
        activeSubGroup, 
        setActiveSubGroup,
        setShowPaymentModal,
        setShowBalanceSheet,
        setShowAddGroupModal,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    
    }: EventSelectProps) {


    return (
        <div className="w-1/2 bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
        <WelcomeBanner />
        
        <div className="flex gap-4 mb-6">
            <button 
                className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-base hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowPaymentModal(true)}>
                <DollarSign size={18} />
                Log Payment
                </button>
            <button 
                className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowBalanceSheet(true)}>
                <CreditCard size={18} />
                View Balance Sheet
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
        {groups.map((group, index) => (
            <div key={group.id} className="p-4">
            <div className="flex flex-col gap-4">
                <div 
                className={`p-4 rounded-lg border-2 border-gray-300 hover:border-indigo-600 transition-colors duration-150 ease-in-out
                    ${activeGroup === index ? "border-indigo-600 bg-indigo-50" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span 
                    className="font-medium text-gray-800 flex-1 cursor-pointer"
                    onClick={() => setActiveGroup(activeGroup === index ? null : index)}
                    >
                    {group.name}
                    </span>
                    <button
                    className="p-2 hover:bg-indigo-100 rounded-lg transition-colors duration-150 flex items-center gap-2 text-gray-700"
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
                    <span className="whitespace-nowrap"><span className="font-semibold">${group.amountToReimburse}</span> to reimburse</span>
                    <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out" 
                        style={{ width: `${group.percentPaid}%` }}
                    ></div>
                    </div>
                    <span className="whitespace-nowrap">{group.percentPaid}% paid</span>
                </div>
                </div>
            </div>
            
            {activeGroup === index && (
                <div className="mt-2 ml-4 space-y-2">
                {group.subGroups.map((subCategory, subIndex) => (
                    <div
                    key={subCategory.id}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                        ${activeSubGroup === subIndex ? 
                        "bg-gray-100 border-l-4 border-l-indigo-400" : ""
                        }`}
                    onClick={() => setActiveSubGroup(activeSubGroup === subIndex ? null : subIndex)}
                    >
                    <div className="flex items-center justify-between">
                        <div className="font-medium text-sm text-gray-700">{subCategory.name}</div>
                        <div className="text-xs text-gray-500">
                        {subCategory.members.length} member{subCategory.members.length !== 1 ? 's' : ''}
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
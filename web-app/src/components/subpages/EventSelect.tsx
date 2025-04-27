import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Group } from "../../types/Group";
import { Dispatch, SetStateAction } from 'react';
import GroupBanner from "../../components/GroupBanner";
import './Subpages.css';

interface EventSelectProps {
    activeGroup: Group | null;
    activeSubGroup: Group | null;
    setActiveSubGroup: Dispatch<SetStateAction<Group | null>>;
    activeSubSubGroup: Group | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<Group | null>>;
    pageState: number;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<boolean>>;
    setShowBalanceSheet: Dispatch<SetStateAction<boolean>>;
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
        pageState,
        setShowPaymentModal,
        setShowBalanceSheet,
        setShowAddSubgroupModal,
        setSelectedGroupForSubgroup
    
    }: EventSelectProps) {


    return (
        <div className="event-select-container">
        <div className="event-select-header">
        {activeGroup !== null && <GroupBanner groupName={activeGroup.name}/>}
        
        <div className="buttons-container">
            <button 
                className="action-button action-button-dark"
                onClick={() => setShowPaymentModal(true)}>
                <Plus size={20} />
                Add Payment
                </button>
            <button 
                className="action-button action-button-secondary"
                onClick={() => setShowBalanceSheet(true)}>
                <CreditCard size={18} />
                Transactions
            </button>
            <button 
                className="action-button action-button-teal"
                onClick={() => setShowAddSubgroupModal(true)}>
                <Plus size={18} />
                Add Subgroup
            </button>
        </div>
        </div>

        <div>
        {activeGroup?.subGroups.map((subGroup) => (
            <div 
                key={subGroup.id} 
                className="subgroup-item"
                onClick={() => setActiveSubGroup(activeSubGroup === subGroup ? null : subGroup)}
            >
            <div className="flex flex-col gap-4">
                <div 
                className={`subgroup-card ${activeSubGroup === subGroup ? "active" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span className="subgroup-name">
                    {subGroup.name}
                    </span>
                    <button
                    className="add-subgroup-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGroupForSubgroup(subGroup.id);
                        setShowAddSubgroupModal(true);
                    }}
                    >
                    <Plus size={18} />
                    Add Subgroup
                    </button>
                </div>
                <div className="group-details">
                    <span className="whitespace-nowrap"><span className="font-semibold">${subGroup.owed}</span> to reimburse</span>
                    <div className="progress-container">
                        <div className="progress-bar">
                        {/* TODO - there should be a total due  */}
                        <div 
                            className="progress-fill" 
                            style={{ width: `${subGroup.paid}%` }}
                        ></div>
                        </div>
                        <span className="whitespace-nowrap">{subGroup.paid}% paid</span>
                    </div>
                </div>
                </div>
            </div>
            
            {/* Display list of subSubGroups - eg Cars for Retreat for UPE */}
            {activeSubGroup?.id === subGroup?.id && pageState >= 3 && (
                <div className="subsubgroup-list">
                {subGroup?.subGroups?.map((subSubGroup) => (
                    <div
                    key={subSubGroup.id}
                    className={`subsubgroup-item ${activeSubSubGroup?.id === subSubGroup?.id ? "active" : ""}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveSubSubGroup(activeSubSubGroup?.id === subSubGroup?.id ? null : subSubGroup);
                    }}
                    >
                    <div className="flex items-center justify-between">
                        <div className="subsubgroup-name">{subSubGroup.name}</div>
                        <div className="subsubgroup-members">
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
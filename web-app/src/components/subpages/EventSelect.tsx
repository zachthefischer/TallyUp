import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { UserGroup } from "../../types/User";
import { Dispatch, SetStateAction } from 'react';
import GroupBanner from "../../components/GroupBanner";
import './Subpages.css';

interface EventSelectProps {
    activeGroup: UserGroup | null;
    activeSubGroup: UserGroup | null;
    setActiveSubGroup: Dispatch<SetStateAction<UserGroup | null>>;
    activeSubSubGroup: UserGroup | null;
    setActiveSubSubGroup: Dispatch<SetStateAction<UserGroup | null>>;

    // Show modals
    setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
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
        <div className="event-select-container">
            <div className="event-select-header">
                {activeGroup !== null && <GroupBanner groupName={activeGroup.groupName}/>}
                <div className="buttons-container">
                    <button 
                        className="action-button action-button-dark"
                        onClick={() => setShowPaymentModal(activeGroup)}>
                        <CreditCard size={18} />
                        Pay/Request
                        </button>
                    <button 
                        className="action-button action-button-teal"
                        onClick={() => setShowBalanceSheet(true)}>
                        <Plus size={20} />
                        Add User
                    </button>
                    <button 
                        className="action-button action-button-secondary"
                        onClick={() => setShowAddSubgroupModal(1)}>
                        <Plus size={18} />
                        Add Subgroup
                    </button>

                </div>
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
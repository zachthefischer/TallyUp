import { Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import { UserGroup } from "../../types/User";
import { Plus } from 'lucide-react';
import './Subpages.css';

interface GroupSelectProps {
    groups: UserGroup[];
    activeGroup: UserGroup | null;
    setActiveGroup: Dispatch<SetStateAction<UserGroup | null>>;
    setShowAddGroupModal: Dispatch<SetStateAction<boolean>>;
    setShowAddUserModal: Dispatch<SetStateAction<boolean>>;
}

export default function GroupSelect(
    {   groups, 
        activeGroup, 
        setActiveGroup, 
        setShowAddGroupModal,
        setShowAddUserModal,
    }: GroupSelectProps) {

    return (
        <div>
            <div className="group-select-container">
                <WelcomeBanner/>
            </div>

            <div>
            {groups && groups.map((group) => (
                <div key={group.groupId} className="group-item">
                <div className="group-item-inner">
                    <div 
                    className={`group-card ${activeGroup === group ? "active" : ""}`} >
                    <div className="flex items-center justify-between">
                        <span className="group-name ml-2" onClick={() => setActiveGroup(activeGroup === group ? null : group)}>
                            {group.groupName}
                        </span>
                    </div>
                    <div className="group-details mt-1">
                      {group.balance !== null && group.balance !== undefined && (
                        <>
                          <span className="whitespace-nowrap"><span className="font-semibold">${group.balance}</span> to reimburse</span>
                          <div className="progress-container">
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${group.balance}%` }}
                              ></div>
                            </div>
                            <span className="whitespace-nowrap">{group.balance}%</span>
                          </div>
                        </>
                      )}
                    </div>
                    </div>
                </div>
                </div>
            ))}

        <div className="buttons-container">
            <button 
                className="add-group-button"
                onClick={() => setShowAddUserModal(true)}>
                <Plus size={18} />
                New User
            </button>

            <button 
                className="add-group-button"
                onClick={() => setShowAddGroupModal(true)}>
                <Plus size={18} />
                Add Group
            </button>
        </div>

        </div>
    </div>
    )
}
import { Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import { Group } from "../../types/Group";
import { Plus } from 'lucide-react';
import './Subpages.css';

interface GroupSelectProps {
    groups: Group[];
    activeGroup: Group | null;
    setActiveGroup: Dispatch<SetStateAction<Group | null>>;
    setShowAddGroupModal: Dispatch<SetStateAction<boolean>>;
}

export default function GroupSelect(
    { groups, 
        activeGroup, 
        setActiveGroup, 
        setShowAddGroupModal,
    }: GroupSelectProps) {

    return (
        <div>
        <div className="group-select-container">
        <WelcomeBanner />
        </div>

        <div>
        {groups.map((group) => (
            <div key={group.id} className="group-item">
            <div className="group-item-inner">
                <div 
                className={`group-card ${activeGroup === group ? "active" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span 
                    className="group-name"
                    onClick={() => setActiveGroup(activeGroup === group ? null : group)}
                    >
                    {group.name}
                    </span>
                </div>
                <div className="group-details">
                    <span className="whitespace-nowrap"><span className="font-semibold">${group.owed}</span> to reimburse</span>
                    <div className="progress-container">
                        <div className="progress-bar">
                        <div 
                            className="progress-fill" 
                            style={{ width: `${group.paid}%` }}
                        ></div>
                        </div>
                        <span className="whitespace-nowrap">{group.paid}%</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        ))}

        <button
            className="add-group-button"
            onClick={() => setShowAddGroupModal(true)}>
            <Plus size={18} />
            Add Group
        </button>

        </div>
    </div>
    )
}
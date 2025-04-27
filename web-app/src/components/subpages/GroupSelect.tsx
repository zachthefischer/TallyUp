import { Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import { UserGroup } from "../../types/User";
import { Plus } from 'lucide-react';

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
            <div className="p-0">
            <WelcomeBanner/>
            </div>

            <div className="border-t border-gray-200">
            {groups && groups.map((group) => (
                <div key={group.groupId} className="py-2 px-0">
                <div className="flex flex-col gap-0">
                    <div 
                    className={`p-3 rounded-lg border-2 border-gray-300 hover:border-[#396e7c] transition-colors duration-150 ease-in-out bg-white w-full
                        ${activeGroup === group ? "border-[#396e7c] bg-[#396e7c]/10" : ""}`}
                    >
                    <div className="flex items-center justify-between">
                        <span 
                        className="font-bold text-xl text-gray-800 flex-1 cursor-pointer"
                        onClick={() => setActiveGroup(activeGroup === group ? null : group)}
                        >
                        {group.groupName}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                        <span className="whitespace-nowrap"><span className="font-semibold">${group.balance}</span> to reimburse</span>
                        <div className="flex items-center gap-2 ml-auto">
                            <div className="relative w-72 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="absolute top-0 left-0 h-full bg-[#396e7c] transition-all duration-500 ease-out" 
                                style={{ width: `${group.balance}%` }}
                            ></div>
                            </div>
                            <span className="whitespace-nowrap">{group.balance}%</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            ))}

            <button 
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-base hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowAddUserModal(true)}>
                <Plus size={18} />
                Add User
            </button>

            <button 
                className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-base hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                onClick={() => setShowAddGroupModal(true)}>
                <Plus size={18} />
                Add Group
            </button>

        </div>
    </div>
    )
}
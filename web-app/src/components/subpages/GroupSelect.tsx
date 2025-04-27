import { Dispatch, SetStateAction } from 'react';
import WelcomeBanner from "../../components/WelcomeBanner";
import { Group } from "../../types/Group";

interface GroupSelectProps {
    groups: Group[];
    activeGroup: Group | null;
    setActiveGroup: Dispatch<SetStateAction<Group | null>>;
}

export default function GroupSelect(
    { groups, 
        activeGroup, 
        setActiveGroup, 
    }: GroupSelectProps) {


    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-6">
        <WelcomeBanner />
        </div>

        <div className="border-t border-gray-200">
        {groups.map((group) => (
            <div key={group.id} className="p-4">
            <div className="flex flex-col gap-4">
                <div 
                className={`p-4 rounded-lg border-2 border-gray-300 hover:border-indigo-600 transition-colors duration-150 ease-in-out
                    ${activeGroup === group ? "border-indigo-600 bg-indigo-50" : ""}`}
                >
                <div className="flex items-center justify-between">
                    <span 
                    className="font-bold text-2xl text-gray-800 flex-1 cursor-pointer"
                    onClick={() => setActiveGroup(activeGroup === group ? null : group)}
                    >
                    {group.name}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                    <span className="whitespace-nowrap"><span className="font-semibold">${group.owed}</span> to reimburse</span>
                    <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    {/* TODO - there should be a total due  */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out" 
                        style={{ width: `${group.paid}%` }}
                    ></div>
                    </div>
                    <span className="whitespace-nowrap">{group.paid}% paid</span>
                </div>
                </div>
            </div>
            </div>
        ))}
        </div>
        </div>
    )
}
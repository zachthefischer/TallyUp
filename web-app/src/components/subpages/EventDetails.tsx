import { CreditCard } from "lucide-react";
import { Group } from "../../types/Groups";
import MembersList from '../MembersList';

interface EventSelectProps {
    groups: Group[];
    activeGroup: number | null;
    activeSubGroup: number | null;
}

export default function EventSelect(
    {   groups, 
        activeGroup, 
        activeSubGroup, 
    }: EventSelectProps) {


    return (
        <div className="w-1/2 bg-white rounded-lg shadow-lg border border-gray-200">
              {activeGroup !== null && activeSubGroup !== null ? (
                <MembersList 
                  members={groups[activeGroup].subGroups[activeSubGroup].members}
                  groupName={groups[activeGroup].name}
                  subCategoryName={groups[activeGroup].subGroups[activeSubGroup].name}
                  onEditMembers={() => {
                    // Here you would handle editing members
                    console.log('Editing members for:', groups[activeGroup].subGroups[activeSubGroup].name);
                  }}
                />
              ) : activeGroup !== null ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{groups[activeGroup].name}</h2>
                    <p className="text-gray-600 mt-1">All Members</p>
                  </div>
                  <div className="space-y-4">
                    {groups[activeGroup].subGroups.flatMap(subCat => subCat.members).map((member, idx) => (
                      <div 
                        key={`${member.id}-${idx}`}
                        className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 ease-in-out"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-800">{member.name}</div>
                            <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                          </div>
                          <div className={`font-semibold text-lg ${member.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {member.amount < 0 ? '-' : '+'}${Math.abs(member.amount)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center justify-center h-full text-center">
                  <div className="bg-gray-50 rounded-full p-6 mb-4">
                    <CreditCard size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-gray-800">Select a group</h3>
                  <p className="text-gray-600 max-w-md">
                    Click on any group from the left panel to view all members or select a subgroup for specific details.
                  </p>
                </div>
              )}
        </div>
    )
}
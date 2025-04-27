import { CreditCard } from "lucide-react";
import { UserGroup } from "../../types/User";
import MembersList from '../MembersList';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getGroupById } from "../../services/apiService";
import { Group, GroupMember } from "../../types/Group";
import { calculateAmount } from "../../services/calculateAmount";

interface EventDetailsProps {
    groups: UserGroup[];
    activeSubGroup: UserGroup | null;
    activeSubSubGroup: UserGroup | null;
    setShowAddPairModal: Dispatch<SetStateAction<UserGroup | null>>;
    setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
  }

export default function EventDetails({   
      activeSubGroup,
      activeSubSubGroup,
      setShowPaymentModal,
      setShowAddPairModal,
    }: EventDetailsProps) {

    const [isLoading, setIsLoading] = useState(false);
    const [subGroup, setSubGroup] = useState<Group | null>(null);
    const [subSubGroup, setSubSubGroup] = useState<Group | null>(null);

  
    useEffect(() => {
      const loadGroups = async () => {
        setIsLoading(true);
        try {
          if (activeSubGroup?.groupId) {
            const subGroupData = await getGroupById(activeSubGroup?.groupId);
            setSubGroup(subGroupData);
          }

          if (activeSubSubGroup?.groupId) {
            const subSubGroupData = await getGroupById(activeSubSubGroup?.groupId);
            setSubSubGroup(subSubGroupData);
          };


          // Uncomment the line below if you want to override mock data with fetched data
          // setGroups(data);
        } catch (error) {
          console.error("Failed to fetch user groups", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      // Uncomment the line below if you want to fetch data from the API
      loadGroups();
    }, [activeSubGroup, activeSubSubGroup]);

    return (
        <div className=" bg-white rounded-lg shadow-lg border border-gray-200">

              { activeSubGroup && !activeSubSubGroup ? (
                <>
                <MembersList 
                  setShowPaymentModal={setShowPaymentModal}
                  setShowAddPairModal={setShowAddPairModal}
                  members={subGroup?.members || []}
                  group={activeSubGroup}
                  onEditMembers={() => {
                    console.log('Editing members for:', subGroup?.members);
                  }}
                />
                </>
              ) : ( activeSubSubGroup ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{activeSubSubGroup?.groupName}</h2>
                    <p className="text-gray-600 mt-1">All Members</p>
                  </div>
                  {activeSubGroup ? (
                    <div className="space-y-4">
                      {subGroup?.subGroups.flatMap(subCat => subCat.members).map((member, idx) => (
                        <div 
                          key={`${member._id}-${idx}`}
                          className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 ease-in-out"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-medium text-gray-800">{member.userName}</div>
                              <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                            </div>
                            <div className={`font-semibold text-lg ${calculateAmount(member) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {calculateAmount(member) < 0 ? '-' : '+'}${Math.abs(calculateAmount(member))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-600">No members in this group yet.</p>
                      <p className="text-gray-500 text-sm mt-2">Add members to see them here.</p>
                    </div>
                  )}
                </div>
              ) : 
                // No subgroup selected
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
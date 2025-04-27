import { CreditCard, ArrowLeft, X } from "lucide-react";
import MembersList from '../MembersList';
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getGroupById } from "../../services/apiService";
import { Group, GroupMember } from "../../types/Group";
import { calculateAmount } from "../../services/calculateAmount";
import { UserGroup } from "../../types/User";

interface EventDetailsProps {
    groups: UserGroup[];
    activeSubGroup: UserGroup | null;
    activeSubSubGroup: UserGroup | null;
    setShowPaymentModal: Dispatch<SetStateAction<UserGroup | null>>;
    handleBack: () => void;
  }

export default function EventDetails({   
      activeSubGroup,
      activeSubSubGroup,
      setShowPaymentModal,
      handleBack,
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

          if (activeSubSubGroup) {
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
        <div className="event-details-container">
              { activeSubGroup && !activeSubSubGroup ? (
                <>
                <MembersList 
                  setShowPaymentModal={setShowPaymentModal}
                  members={subGroup?.members || []}
                  group={activeSubGroup}
                  onEditMembers={() => {
                    console.log('Editing members for:', subGroup?.members);
                  }}
                  onClose={handleBack}
                />
                </>
              ) : ( activeSubSubGroup ? (
                <div className="event-details-header">
                  <div className="mb-6">
                    <h2 className="event-details-title">{activeSubSubGroup?.groupName}</h2>
                    <p className="text-gray-600 mt-1">All Members</p>
                  </div>
                  {activeSubGroup ? (
                    <div className="members-list">
                      {subGroup?.subGroups.flatMap(subCat => subCat.members).map((member, idx) => (
                        <div 
                          key={`${member._id}-${idx}`}
                          className="member-card"
                        >
                          <div className="member-info">
                            <div>
                              <div className="member-name">{member.userName}</div>
                              <div className="member-transaction">{member.transaction} • {member.timeAgo}</div>
                            </div>
                            <div className={`member-amount ${calculateAmount(member) < 0 ? 'negative' : 'positive'}`}>
                              {calculateAmount(member) < 0 ? '-' : '+'}${Math.abs(calculateAmount(member))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <p>No members in this group yet.</p>
                      <p className="small">Add members to see them here.</p>
                    </div>
                  )}
                </div>
              ) : 
                // No subgroup selected
                <div className="select-group-prompt">
                  <div className="prompt-icon">
                    <CreditCard size={32} className="text-gray-400" />
                  </div>
                  <h3 className="prompt-title">Select a group</h3>
                  <p className="prompt-description">
                    Click on any group from the left panel to view all members or select a subgroup for specific details.
                  </p>
                </div>
              )}
        </div>
    )
}
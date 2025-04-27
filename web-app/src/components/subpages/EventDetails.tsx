import { CreditCard, ArrowLeft, X } from "lucide-react";
import { Group } from "../../types/Group";
import MembersList from '../MembersList';
import './Subpages.css';

interface EventDetailsProps {
    groups: Group[];
    activeSubGroup: Group | null;
    activeSubSubGroup: Group | null;
    handleBack: () => void;
}

export default function EventDetails({   
      activeSubGroup,
      activeSubSubGroup,
      handleBack,
    }: EventDetailsProps) {

    return (
        <div className="event-details-container">
              { activeSubGroup && activeSubSubGroup ? (
                <>
                  <MembersList 
                    members={activeSubSubGroup.members}
                    groupName={activeSubGroup.name}
                    subCategoryName={activeSubSubGroup.name}
                    onEditMembers={() => {
                      // Here you would handle editing members
                      console.log('Editing members for:', activeSubSubGroup.name);
                    }}
                    onClose={handleBack}
                  />
                </>
              ) : activeSubGroup ? (
                <>
                  <div className="event-details-header">
                    <div className="event-details-title">
                      <h2>{activeSubSubGroup?.name}</h2>
                      <p>All Members</p>
                    </div>
                    <button 
                      className="close-button"
                      onClick={handleBack}
                      aria-label="Go back"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  {activeSubGroup ? (
                    <div className="members-list">
                      {activeSubGroup?.subGroups.flatMap(subCat => subCat.members).map((member, idx) => (
                        <div 
                          key={`${member.id}-${idx}`}
                          className="member-card"
                        >
                          <div className="member-info">
                            <div>
                              <div className="member-name">{member.name}</div>
                              <div className="member-transaction">{member.transaction} • {member.timeAgo}</div>
                            </div>
                            <div className={`member-amount ${member.amount < 0 ? 'negative' : 'positive'}`}>
                              {member.amount < 0 ? '-' : '+'}${Math.abs(member.amount)}
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
                </>
              ) : (
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
import React, { useState } from "react";
import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Group } from "../types/Groups";
import AddGroupModal from "../components/AddGroupModal";
import MembersList from "../components/MembersList";
import BalanceSheet from "../components/BalanceSheet";
import PaymentModal from "../components/PaymentModal";
import AddSubgroupModal from "../components/AddSubgroupModal";
import Header from "../components/Header";
import { BalanceSheetItem } from "../types/BalanceSheet";
import EventSelect from "../components/subpages/EventSelect";


// Main App Component
export default function Dashboard() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeSubGroup, setActiveSubGroup] = useState<number | null>(null);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(false);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");

  const groups: Group[] = [
    {
      id: 1,
      name: "Spring Retreat",
      amountToReimburse: 1250,
      percentPaid: 75,
      subGroups: [
        {
          id: 1,
          name: "Accommodation",
          members: [
            { id: 1, name: "Sarah Johnson", transaction: "Lodging fee", timeAgo: "3 days ago", amount: -150 },
            { id: 2, name: "Michael Smith", transaction: "Room service", timeAgo: "5 days ago", amount: 85 }
          ]
        },
        {
          id: 2,
          name: "Activities",
          members: [
            { id: 3, name: "Chris Davis", transaction: "Equipment rental", timeAgo: "2 days ago", amount: -210 },
            { id: 5, name: "Taylor Rogers", transaction: "Activity costs", timeAgo: "1 day ago", amount: 120 }
          ]
        },
        {
          id: 3,
          name: "Food & Beverages",
          members: [
            { id: 4, name: "Jessica Williams", transaction: "Food and drinks", timeAgo: "4 days ago", amount: -180 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "Tournament Travel",
      amountToReimburse: 2350,
      percentPaid: 45,
      subGroups: [
        {
          id: 1,
          name: "Transportation",
          members: [
            { id: 2, name: "Amanda Lee", transaction: "Flight tickets", timeAgo: "6 days ago", amount: -450 },
            { id: 4, name: "Ella Parker", transaction: "Equipment transport", timeAgo: "2 days ago", amount: 130 }
          ]
        },
        {
          id: 2,
          name: "Accommodation",
          members: [
            { id: 1, name: "David Thompson", transaction: "Hotel booking", timeAgo: "1 week ago", amount: -320 }
          ]
        },
        {
          id: 3,
          name: "Tournament Fees",
          members: [
            { id: 3, name: "Robert Martin", transaction: "Tournament fees", timeAgo: "3 days ago", amount: 275 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: "Annual Fundraiser",
      amountToReimburse: 3600,
      percentPaid: 90,
      subGroups: [
        {
          id: 1,
          name: "Venue Rental",
          members: [
            { id: 1, name: "Emma Wilson", transaction: "Venue rental", timeAgo: "2 weeks ago", amount: -950 }
          ]
        },
        {
          id: 2,
          name: "Catering Services",
          members: [
            { id: 2, name: "James Brown", transaction: "Catering services", timeAgo: "10 days ago", amount: -1200 }
          ]
        },
        {
          id: 3,
          name: "Decoration",
          members: [
            { id: 3, name: "Olivia Jones", transaction: "Decoration", timeAgo: "1 week ago", amount: 300 }
          ]
        },
        {
          id: 4,
          name: "Promotional Materials",
          members: [
            { id: 4, name: "Daniel Miller", transaction: "Promotional materials", timeAgo: "5 days ago", amount: -420 }
          ]
        }
      ]
    },
    {
      id: 4,
      name: "Equipment Purchase",
      amountToReimburse: 850,
      percentPaid: 60,
      subGroups: [
        {
          id: 1,
          name: "Tennis Rackets",
          members: [
            { id: 1, name: "Ryan Taylor", transaction: "Tennis rackets", timeAgo: "2 weeks ago", amount: -350 }
          ]
        },
        {
          id: 2,
          name: "Tennis Balls",
          members: [
            { id: 2, name: "Sophia Clark", transaction: "Tennis balls", timeAgo: "1 week ago", amount: -120 }
          ]
        },
        {
          id: 3,
          name: "Court Equipment",
          members: [
            { id: 3, name: "Ethan White", transaction: "Court equipment", timeAgo: "3 days ago", amount: 180 }
          ]
        }
      ]
    }
  ];

  const balanceSheetData: BalanceSheetItem[] = [
    { group: "Spring Retreat", budget: 2000, spent: 1650, reimbursed: 1245, balance: 405 },
    { group: "Tournament Travel", budget: 3500, spent: 2850, reimbursed: 1282.5, balance: 1567.5 },
    { group: "Annual Fundraiser", budget: 5000, spent: 4200, reimbursed: 3780, balance: 420 },
    { group: "Equipment Purchase", budget: 1500, spent: 950, reimbursed: 570, balance: 380 },
    { group: "Social Events", budget: 1200, spent: 980, reimbursed: 880, balance: 120 }
  ];

  // Total calculations for the balance sheet
  const totalBudget = balanceSheetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = balanceSheetData.reduce((sum, item) => sum + item.spent, 0);
  const totalReimbursed = balanceSheetData.reduce((sum, item) => sum + item.reimbursed, 0);
  const totalBalance = balanceSheetData.reduce((sum, item) => sum + item.balance, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header/>

      <div className="flex-1 flex p-8">
        {showBalanceSheet ? (
          <div className="w-full bg-white rounded-lg shadow-lg">
            <BalanceSheet 
              balanceSheetData={balanceSheetData} 
              totalBudget={totalBudget}
              totalSpent={totalSpent}
              totalReimbursed={totalReimbursed}
              totalBalance={totalBalance}
              onBack={() => setShowBalanceSheet(false)} 
            />
          </div>
        ) : (
          <div className="w-full flex gap-8">
            <EventSelect 
              groups={groups} 
              activeGroup={activeGroup}
              setActiveGroup={setActiveGroup}
              activeSubGroup={activeSubGroup} 
              setActiveSubGroup={setActiveSubGroup} />            
            
            
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
          </div>
        )}

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} groups={groups} />
      )}

      {showAddGroupModal && (
        <AddGroupModal 
          onClose={() => setShowAddGroupModal(false)}
          onAdd={(groupName) => {
            // Here you would handle adding the new group
            console.log('Adding new group:', groupName);
            setShowAddGroupModal(false);
          }}
        />
      )}

      {showAddSubgroupModal && (
        <AddSubgroupModal
          onClose={() => setShowAddSubgroupModal(false)}
          onAdd={(subgroupName) => {
            // Here you would handle adding the new subgroup
            console.log('Adding new subgroup:', subgroupName, 'to group:', selectedGroupForSubgroup);
            setShowAddSubgroupModal(false);
          }}
          parentGroupName={selectedGroupForSubgroup}
        />
      )}
      </div>
    </div>
  );
}
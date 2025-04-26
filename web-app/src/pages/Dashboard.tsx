import React, { useState } from "react";
import {  DollarSign, CreditCard, Plus } from "lucide-react";
import { Member } from "../types/Members";
import { Group } from "../types/Groups";
import AddGroupModal from "../components/AddGroupModal";
import MembersList from "../components/MembersList";
import BalanceSheet from "../components/BalanceSheet";
import PaymentModal from "../components/PaymentModal";
import { BalanceSheetItem } from "../types/BalanceSheet";
import AddSubgroupModal from "../components/AddSubgroupModal";
import WelcomeBanner from "../components/WelcomeBanner";


// Main App Component
export default function Dashboard() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [activeSubGroup, setActiveSubGroup] = useState<number | null>(null);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(false);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");

  const categories: Group[] = [
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
    { category: "Spring Retreat", budget: 2000, spent: 1650, reimbursed: 1245, balance: 405 },
    { category: "Tournament Travel", budget: 3500, spent: 2850, reimbursed: 1282.5, balance: 1567.5 },
    { category: "Annual Fundraiser", budget: 5000, spent: 4200, reimbursed: 3780, balance: 420 },
    { category: "Equipment Purchase", budget: 1500, spent: 950, reimbursed: 570, balance: 380 },
    { category: "Social Events", budget: 1200, spent: 980, reimbursed: 880, balance: 120 }
  ];

  // Total calculations for the balance sheet
  const totalBudget = balanceSheetData.reduce((sum, item) => sum + item.budget, 0);
  const totalSpent = balanceSheetData.reduce((sum, item) => sum + item.spent, 0);
  const totalReimbursed = balanceSheetData.reduce((sum, item) => sum + item.reimbursed, 0);
  const totalBalance = balanceSheetData.reduce((sum, item) => sum + item.balance, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-full px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-semibold text-indigo-600">Club Finance Manager</div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Business Account: Tennis Club</span>
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex p-8">
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
            <div className="w-1/2 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-6">
                <WelcomeBanner />
                
                <div className="flex gap-4 mb-6">
                  <button 
                    className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold text-base hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    <DollarSign size={18} />
                    Log Payment
                  </button>
                  <button 
                    className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold text-base text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                    onClick={() => setShowBalanceSheet(true)}
                  >
                    <CreditCard size={18} />
                    View Balance Sheet
                  </button>
                  <button 
                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold text-base hover:bg-green-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
                    onClick={() => setShowAddGroupModal(true)}
                  >
                    <Plus size={18} />
                    Add Group
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200">
                {categories.map((category, index) => (
                  <div key={category.id} className="p-4">
                    <div className="flex flex-col gap-4">
                      <div 
                        className={`p-4 rounded-lg border-2 border-gray-300 hover:border-indigo-600 transition-colors duration-150 ease-in-out
                          ${activeGroup === index ? "border-indigo-600 bg-indigo-50" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className="font-medium text-gray-800 flex-1 cursor-pointer"
                            onClick={() => setActiveGroup(activeGroup === index ? null : index)}
                          >
                            {category.name}
                          </span>
                          <button
                            className="p-2 hover:bg-indigo-100 rounded-lg transition-colors duration-150 flex items-center gap-2 text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedGroupForSubgroup(category.name);
                              setShowAddSubgroupModal(true);
                            }}
                          >
                            <Plus size={18} />
                            Add Subgroup
                          </button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                          <span className="whitespace-nowrap"><span className="font-semibold">${category.amountToReimburse}</span> to reimburse</span>
                          <div className="relative flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-500 ease-out" 
                              style={{ width: `${category.percentPaid}%` }}
                            ></div>
                          </div>
                          <span className="whitespace-nowrap">{category.percentPaid}% paid</span>
                        </div>
                      </div>
                    </div>
                    
                    {activeGroup === index && (
                      <div className="mt-2 ml-4 space-y-2">
                        {category.subGroups.map((subCategory, subIndex) => (
                          <div
                            key={subCategory.id}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                              ${activeSubGroup === subIndex ? 
                                "bg-gray-100 border-l-4 border-l-indigo-400" : ""
                              }`}
                            onClick={() => setActiveSubGroup(activeSubGroup === subIndex ? null : subIndex)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm text-gray-700">{subCategory.name}</div>
                              <div className="text-xs text-gray-500">
                                {subCategory.members.length} member{subCategory.members.length !== 1 ? 's' : ''}
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
            
            <div className="w-1/2 bg-white rounded-lg shadow-lg border border-gray-200">
              {activeGroup !== null && activeSubGroup !== null ? (
                <MembersList 
                  members={categories[activeGroup].subGroups[activeSubGroup].members}
                  categoryName={categories[activeGroup].name}
                  subCategoryName={categories[activeGroup].subGroups[activeSubGroup].name}
                  onEditMembers={() => {
                    // Here you would handle editing members
                    console.log('Editing members for:', categories[activeGroup].subGroups[activeSubGroup].name);
                  }}
                />
              ) : activeGroup !== null ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{categories[activeGroup].name}</h2>
                    <p className="text-gray-600 mt-1">All Members</p>
                  </div>
                  <div className="space-y-4">
                    {categories[activeGroup].subGroups.flatMap(subCat => subCat.members).map((member, idx) => (
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
                  <h3 className="text-xl font-medium mb-2 text-gray-800">Select a category</h3>
                  <p className="text-gray-600 max-w-md">
                    Click on any category from the left panel to view all members or select a subcategory for specific details.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} categories={categories} />
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
  );
}
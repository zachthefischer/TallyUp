import React, { useState } from "react";
import { Group } from "../types/Group";
import AddGroupModal from "../components/AddGroupModal";
import BalanceSheet from "../components/BalanceSheet";
import PaymentModal from "../components/PaymentModal";
import AddSubgroupModal from "../components/AddSubgroupModal";
import Header from "../components/Header";
import { BalanceSheetItem } from "../types/BalanceSheet";
import EventSelect from "../components/subpages/EventSelect";
import EventDetails from "../components/subpages/EventDetails";


// Main App Component
export default function Dashboard() {
  const [activeGroup, setActiveGroup = () => {
    setState(1); // Transition to state 2
    console.log("Active group set to:", activeGroup);
  }] = useState<number | null>(null);
  const [activeSubGroup, setActiveSubGroup = () => {
    setState(2); // Transition to state 2
  }] = useState<number | null>(null);

  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(false);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");
  const [state, setState] = useState(1); // Initial state is 1


  const handleBox2Click = () => {
    setState(3); // Transition to state 3
  };

  const handleBack = () => {
    setState(Math.max(state - 1, 1)); // Transition to state 3
  };

  const groups: Group[] = [
    {
      id: "1",
      name: "ACM",
      paid: 1200,
      owed: 300,
      members: [
        { id: "m1", name: "Alice", transaction: "Paid for venue", timeAgo: "2 days ago", amount: 500 },
        { id: "m2", name: "Bob", transaction: "Paid for snacks", timeAgo: "1 day ago", amount: 200 },
      ],
      subGroups: [
        {
          id: "1-1",
          name: "Retreat",
          paid: 600,
          owed: 100,
          members: [
            { id: "m3", name: "Charlie", transaction: "Paid for lodging", timeAgo: "5 days ago", amount: 400 },
          ],
          subGroups: [
            {
              id: "1-1-1",
              name: "Car 1",
              paid: 200,
              owed: 0,
              members: [
                { id: "m4", name: "Dave", transaction: "Gas money", timeAgo: "4 days ago", amount: 100 },
              ],
              subGroups: [],
            },
            {
              id: "1-1-2",
              name: "Car 2",
              paid: 150,
              owed: 50,
              members: [
                { id: "m5", name: "Eve", transaction: "Snacks for trip", timeAgo: "3 days ago", amount: 50 },
              ],
              subGroups: [],
            },
          ],
        },
        {
          id: "1-2",
          name: "Merch",
          paid: 300,
          owed: 50,
          members: [
            { id: "m6", name: "Frank", transaction: "Ordered Tote Bags", timeAgo: "1 week ago", amount: 100 },
          ],
          subGroups: [
            {
              id: "1-2-1",
              name: "Tote Bags",
              paid: 100,
              owed: 0,
              members: [],
              subGroups: [],
            },
            {
              id: "1-2-2",
              name: "Hoodies",
              paid: 150,
              owed: 0,
              members: [],
              subGroups: [],
            },
            {
              id: "1-2-3",
              name: "Stickers",
              paid: 50,
              owed: 0,
              members: [],
              subGroups: [],
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Tennis Club",
      paid: 800,
      owed: 200,
      members: [
        { id: "m7", name: "Grace", transaction: "Paid for court rental", timeAgo: "3 days ago", amount: 300 },
      ],
      subGroups: [
        {
          id: "2-1",
          name: "Retreat",
          paid: 500,
          owed: 150,
          members: [
            { id: "m8", name: "Hank", transaction: "Paid for retreat house", timeAgo: "2 weeks ago", amount: 400 },
          ],
          subGroups: [
            {
              id: "2-1-1",
              name: "Food",
              paid: 200,
              owed: 50,
              members: [],
              subGroups: [],
            },
            {
              id: "2-1-2",
              name: "Activities",
              paid: 100,
              owed: 50,
              members: [],
              subGroups: [],
            },
          ],
        },
        {
          id: "2-2",
          name: "Annual Fundraiser",
          paid: 400,
          owed: 0,
          members: [],
          subGroups: [
            {
              id: "2-2-1",
              name: "Catering",
              paid: 400,
              owed: 0,
              members: [],
              subGroups: [],
            },
          ],
        },
      ],
    },
    {
      id: "3",
      name: "UPE",
      paid: 400,
      owed: 0,
      members: [
        { id: "m9", name: "Ivan", transaction: "Paid for UPE conference", timeAgo: "1 month ago", amount: 400 },
      ],
      subGroups: [
        {
          id: "3-1",
          name: "Fees",
          paid: 300,
          owed: 0,
          members: [],
          subGroups: [],
        },
      ],
    },
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

      <div className="flex-1 flex p-8 mt-15">
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
              setActiveSubGroup={setActiveSubGroup} 
              setShowBalanceSheet={setShowBalanceSheet}
              setShowPaymentModal={setShowPaymentModal}
              setShowAddGroupModal={setShowAddGroupModal}
              setShowAddSubgroupModal={setShowAddSubgroupModal}
              setSelectedGroupForSubgroup={setSelectedGroupForSubgroup}
            />            
            
            <EventDetails 
              groups={groups} 
              activeGroup={activeGroup} 
              activeSubGroup={activeSubGroup} 
            />
      
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
import React, { useState, useEffect } from "react";
import { Group } from "../types/Group";
import { BalanceSheetItem } from "../types/BalanceSheet";
import Header from "../components/Header";
import EventSelect from "../components/subpages/EventSelect";
import BalanceSheet from "../components/BalanceSheet";
import PaymentModal from "../components/PaymentModal";
import EventDetails from "../components/subpages/EventDetails";

import { fetchUserGroups, createGroup, createSubgroup } from "../services/apiService";
import { User } from "../types/User";
import GroupSelect from "../components/subpages/GroupSelect";
import AddGroupModal from "../components/AddGroupModal";
import AddSubgroupModal from "../components/AddSubgroupModal";
import './Dashboard.css';

// Main App Component
export default function Dashboard() {
  const [activeGroup, _setActiveGroup] = useState<Group | null>(null);
  const [activeSubGroup, _setActiveSubGroup] = useState<Group | null>(null);
  const [activeSubSubGroup, _setActiveSubSubGroup ] = useState<Group | null>(null);

  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(false);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");
  const [pageState, setPageState] = useState(1); // Initial state is 1

  const setActiveGroup = (newValue: Group | null) => {
    _setActiveGroup(newValue);
    // _setActiveSubGroup(null);
    // _setActiveSubSubGroup(null);
    setPageState(2);
    console.log("Active group set to:", activeGroup);
  };

  const setActiveSubGroup = (newValue: Group | null) => {
    _setActiveSubGroup(newValue);
    // _setActiveSubSubGroup(null);
    setPageState(3);
    console.log("Active group set to:", activeGroup);
  };

  const setActiveSubSubGroup = (newValue: Group | null) => {
    _setActiveSubSubGroup(newValue);
    // setPageState(3);
    // console.log("Active group set to:", pageState);
  };


  const handleBack = () => {
    setPageState(Math.max(pageState - 1, 1)); // Transition to state 3
  };

  // Define mock data
  const mockGroups: Group[] = [
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

  // Initialize state with mock data
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch groups - now only fetch if we want to override mock data
  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserGroups();
        console.log("Fetched groups:", data);
        // Uncomment the line below if you want to override mock data with fetched data
        // setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Uncomment the line below if you want to fetch data from the API
    // loadGroups();
  }, []);

  // Handle adding a new group
  const handleAddGroup = async (groupName: string) => {
    try {
      // Create a properly structured group object
      const newGroup = await createGroup({ 
        name: groupName,
        paid: 0,
        owed: 0,
        members: [],
        subGroups: []
      });
      console.log("New group created:", newGroup);
      
      // Update the groups state with the new group
      setGroups(prevGroups => [...prevGroups, newGroup]);
      setShowAddGroupModal(false);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  // Handle adding a new subgroup
  const handleAddSubgroup = async (subgroupName: string) => {
    try {
      // Find the parent group
      const parentGroup = groups.find(group => group.id === selectedGroupForSubgroup);
      
      if (!parentGroup) {
        console.error("Parent group not found");
        return;
      }
      
      // Create a properly structured subgroup object
      const newSubgroup = {
        id: `${parentGroup.id}-${parentGroup.subGroups.length + 1}`,
        name: subgroupName,
        paid: 0,
        owed: 0,
        members: [],
        subGroups: []
      };
      
      // In a real app, you would call the API here
      // const newSubgroup = await createSubgroup(parentGroup.id, { name: subgroupName });
      
      // Update the groups state with the new subgroup
      setGroups(prevGroups => {
        return prevGroups.map(group => {
          if (group.id === parentGroup.id) {
            return {
              ...group,
              subGroups: [...group.subGroups, newSubgroup]
            };
          }
          return group;
        });
      });
      
      console.log("New subgroup created:", newSubgroup);
      setShowAddSubgroupModal(false);
    } catch (error) {
      console.error("Failed to create subgroup:", error);
    }
  };
  
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
            <div className={`box 
              ${pageState === 1 ? 'center' : ''}
              ${pageState === 2 ? 'box-left' : ''}
              ${pageState === 3 ? 'offscreen-left' : ''} 
            `}>
              <GroupSelect 
                groups={groups} 
                activeGroup={activeGroup}
                setActiveGroup={(value) => setActiveGroup(value as Group | null)} 
              />            
            </div>
            

            <div className={`box
              ${pageState === 1 ? 'offscreen-right' : ''}
              ${pageState === 2 ? 'box-right' : ''}
              ${pageState === 3 ? 'box-left' : ''} 
            `}>
              <EventSelect 
                groups={groups} 
                activeGroup={activeGroup}
                activeSubGroup={activeSubGroup}
                setActiveSubGroup={(value) => setActiveSubGroup(value as Group | null)}
                activeSubSubGroup={activeSubSubGroup} 
                setActiveSubSubGroup={(value) => setActiveSubSubGroup(value as Group | null)} 
                setShowBalanceSheet={setShowBalanceSheet}
                setShowPaymentModal={setShowPaymentModal}
                setShowAddGroupModal={setShowAddGroupModal}
                setShowAddSubgroupModal={setShowAddSubgroupModal}
                setSelectedGroupForSubgroup={setSelectedGroupForSubgroup}
              />            
            </div>


            <div className={`box 
              ${pageState === 1 ? 'offscreen-right' : ''}
              ${pageState === 2 ? 'offscreen-right' : ''}
              ${pageState === 3 ? 'box-right' : ''} 
            `}>
            <EventDetails 
              groups={groups} 
              activeSubGroup={activeSubGroup} 
              activeSubSubGroup={activeSubSubGroup} 
            />
            </div>
      
          </div>
        )}

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} groups={groups} />
      )}

      {showAddGroupModal && (
        <AddGroupModal 
          onClose={() => setShowAddGroupModal(false)}
          onAdd={handleAddGroup}
        />
      )}

      {showAddSubgroupModal && (
        <AddSubgroupModal
          onClose={() => setShowAddSubgroupModal(false)}
          onAdd={handleAddSubgroup}
          parentGroupName={selectedGroupForSubgroup}
        />
      )}
      </div>
    </div>
  );
}
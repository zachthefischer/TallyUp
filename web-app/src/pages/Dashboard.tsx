import { useState, useEffect } from "react";
import { UserGroup } from "../types/User";
import { BalanceSheetItem } from "../types/BalanceSheet";
import Header from "../components/Header";
import EventSelect from "../components/subpages/EventSelect";
import BalanceSheet from "../components/BalanceSheet";
import PaymentModal from "../components/PaymentModal";
import EventDetails from "../components/subpages/EventDetails";

import { fetchUserGroups, createGroup, createUser, createTransaction, createSubGroup } from "../services/apiService";
import GroupSelect from "../components/subpages/GroupSelect";
import AddGroupModal from "../components/AddGroupModal";
import AddSubgroupModal from "../components/AddSubgroupModal";
import './Dashboard.css';
import AddUserModal from "../components/AddUserModal";

// Main App Component
export default function Dashboard() {
  const ZACH_USER_ID = "680d9e93497e87670cb8356b"; // Replace with the actual user ID

  const [groups, setGroups] = useState<UserGroup[]>([]);
  const [activeGroup, _setActiveGroup] = useState<UserGroup | null>(null);
  const [activeSubGroup, _setActiveSubGroup] = useState<UserGroup | null>(null);
  const [activeSubSubGroup, _setActiveSubSubGroup ] = useState<UserGroup | null>(null);

  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(0);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");
  const [pageState, setPageState] = useState(1); // Initial state is 1

  const setActiveGroup = (newValue: UserGroup | null) => {
    _setActiveGroup(newValue);
    setPageState(2);
    console.log("Active group set to:", activeGroup);
  };

  const setActiveSubGroup = (newValue: UserGroup | null) => {
    console.log("Active sub group set to:", newValue);

    _setActiveSubGroup(newValue);
    setPageState(3);
  };

  const setActiveSubSubGroup = (newValue: UserGroup | null) => {
    _setActiveSubSubGroup(newValue);
  };


  const handleBack = () => {
    setPageState(Math.max(pageState - 1, 1)); // Transition to state 3
  };


  // Initialize state with mock data
  const [isLoading, setIsLoading] = useState(false);


  // Fetch groups - now only fetch if we want to override mock data
  useEffect(() => {
    const loadGroups = async () => {
      setIsLoading(true);
      try {
        const data = await fetchUserGroups(ZACH_USER_ID);
        console.log("Fetched user groups:", data);
        setGroups(data);
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
  }, []);


  const handleAddUser = async (firstName: string, lastName: string) => {
    try {
      // Create a properly structured group object
      const newUser = await createUser( firstName, lastName);
      console.log("New user created:", newUser);
      
      // Update the users state with the new user
      setShowAddUserModal(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };


  // Handle adding a new group
  const handleAddGroup = async (groupName: string) => {
    try {
      // Create a properly structured group object
      const newGroup = await createGroup(groupName, ZACH_USER_ID, true);
      console.log("New group created:", newGroup);
      
      // Update the groups state with the new group
      setGroups(groups => [...groups, newGroup]);
      setShowAddGroupModal(false);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };


  // Handle adding a new subgroup
  const handleAddSubgroup = async (groupId ?: string, subgroupName ?: string) => {
    if (!groupId || !subgroupName) {
      console.error("Group ID and subgroup name are required");
      return;
    }
    try {
      console.log("Create subgroup:", groupId, subgroupName);

      const result = await createSubGroup( groupId, subgroupName);
      
      console.log("New subgroup created:", result);
      setShowAddSubgroupModal(0);
    } catch (error) {
      console.error("Failed to create subgroup:", error);
    }
  };


  // Handle adding a new transaction
  const handleAddTransaction = async (userId: string, amount: number, description: string) => {
    try {
      // Create a properly structured subgroup object
      if (activeGroup === null) { return; }

      const result = await createTransaction(userId, activeGroup.groupId, amount, description);
      console.log("New transaction created:", result);
      setShowPaymentModal(false);
    } catch (error) {
      console.error("Failed to create transaction:", error);
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
                setActiveGroup={(value) => setActiveGroup(value as UserGroup | null)} 
                setShowAddGroupModal={setShowAddGroupModal}
                setShowAddUserModal={setShowAddUserModal}
                />            
            </div>
            

            <div className={`box
              ${pageState === 1 ? 'offscreen-right' : ''}
              ${pageState === 2 ? 'box-right' : ''}
              ${pageState === 3 ? 'box-left' : ''} 
            `}>
              <EventSelect 
                activeGroup={activeGroup}
                activeSubGroup={activeSubGroup}
                setActiveSubGroup={(value) => setActiveSubGroup(value as UserGroup | null)}
                activeSubSubGroup={activeSubSubGroup} 
                setActiveSubSubGroup={(value) => setActiveSubSubGroup(value as UserGroup | null)} 
                setShowBalanceSheet={setShowBalanceSheet}
                setShowPaymentModal={setShowPaymentModal}
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
        <PaymentModal 
        onClose={() => setShowPaymentModal(false)}  
        onAdd={handleAddTransaction}
        group={activeSubGroup} 
        />
      )}

      {showAddUserModal && (
        <AddUserModal 
          onClose={() => setShowAddUserModal(false)}
          onAdd={handleAddUser}
        />
      )}

      {showAddGroupModal && (
        <AddGroupModal 
          onClose={() => setShowAddGroupModal(false)}
          onAdd={handleAddGroup}
        />
      )}

      {showAddSubgroupModal && (
        <AddSubgroupModal
          onClose={() => setShowAddSubgroupModal(0)}
          modalType={showAddSubgroupModal}
          onAdd={handleAddSubgroup}
          group={activeGroup}
          subGroup={activeSubGroup}
        />
      )}
      </div>
    </div>
  );
}
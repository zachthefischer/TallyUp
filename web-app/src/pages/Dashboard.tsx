import React, { useState } from "react";
import { ChevronDown, ChevronUp, DollarSign, CreditCard, ArrowDown, ArrowUp, Plus } from "lucide-react";

interface Member {
  id: number;
  name: string;
  transaction: string;
  timeAgo: string;
  amount: number;
}

interface SubCategory {
  id: number;
  name: string;
  members: Member[];
}

interface Category {
  id: number;
  name: string;
  amountToReimburse: number;
  percentPaid: number;
  subCategories: SubCategory[];
}

interface BalanceSheetItem {
  category: string;
  budget: number;
  spent: number;
  reimbursed: number;
  balance: number;
}

interface CategoryListProps {
  categories: Category[];
  activeCategory: number | null;
  setActiveCategory: (index: number | null) => void;
}

interface CategoryMembersProps {
  category: Category;
}

interface DetailPanelProps {
  activeCategory: Category | null;
}

interface BalanceSheetProps {
  balanceSheetData: BalanceSheetItem[];
  totalBudget: number;
  totalSpent: number;
  totalReimbursed: number;
  totalBalance: number;
  onBack: () => void;
}

interface PaymentModalProps {
  onClose: () => void;
  categories: Category[];
}

interface MembersListProps {
  members: Member[];
  categoryName: string;
  subCategoryName: string;
  onEditMembers: () => void;
}

interface AddGroupModalProps {
  onClose: () => void;
  onAdd: (groupName: string) => void;
}

interface AddSubgroupModalProps {
  onClose: () => void;
  onAdd: (subgroupName: string) => void;
  parentGroupName: string;
}

// Main App Component
export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showAddSubgroupModal, setShowAddSubgroupModal] = useState(false);
  const [selectedGroupForSubgroup, setSelectedGroupForSubgroup] = useState<string>("");

  const categories: Category[] = [
    {
      id: 1,
      name: "Spring Retreat",
      amountToReimburse: 1250,
      percentPaid: 75,
      subCategories: [
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
      subCategories: [
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
      subCategories: [
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
      subCategories: [
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
                          ${activeCategory === index ? "border-indigo-600 bg-indigo-50" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <span 
                            className="font-medium text-gray-800 flex-1 cursor-pointer"
                            onClick={() => setActiveCategory(activeCategory === index ? null : index)}
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
                    
                    {activeCategory === index && (
                      <div className="mt-2 ml-4 space-y-2">
                        {category.subCategories.map((subCategory, subIndex) => (
                          <div
                            key={subCategory.id}
                            className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ease-in-out
                              ${activeSubCategory === subIndex ? 
                                "bg-gray-100 border-l-4 border-l-indigo-400" : ""
                              }`}
                            onClick={() => setActiveSubCategory(activeSubCategory === subIndex ? null : subIndex)}
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
              {activeCategory !== null && activeSubCategory !== null ? (
                <MembersList 
                  members={categories[activeCategory].subCategories[activeSubCategory].members}
                  categoryName={categories[activeCategory].name}
                  subCategoryName={categories[activeCategory].subCategories[activeSubCategory].name}
                  onEditMembers={() => {
                    // Here you would handle editing members
                    console.log('Editing members for:', categories[activeCategory].subCategories[activeSubCategory].name);
                  }}
                />
              ) : activeCategory !== null ? (
                <div className="p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">{categories[activeCategory].name}</h2>
                    <p className="text-gray-600 mt-1">All Members</p>
                  </div>
                  <div className="space-y-4">
                    {categories[activeCategory].subCategories.flatMap(subCat => subCat.members).map((member, idx) => (
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

function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-white rounded-lg p-6 mb-6 border border-indigo-100">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Tennis Club</h2>
      <p className="text-gray-600">Manage your club's finances and reimbursements</p>
    </div>
  );
}

function MembersList({ members, categoryName, subCategoryName, onEditMembers }: MembersListProps) {
  const membersWhoOwe = members.filter(member => member.amount < 0);
  const membersOwed = members.filter(member => member.amount > 0);

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{categoryName}</h2>
          <p className="text-gray-600 mt-1">{subCategoryName}</p>
        </div>
        <button
          onClick={onEditMembers}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-all duration-200"
        >
          Edit Members
        </button>
      </div>

      {membersWhoOwe.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-red-600 font-medium">
            <ArrowDown size={18} />
            <h3 className="text-lg">Members Who Owe Money</h3>
          </div>
          <div className="space-y-3">
            {membersWhoOwe.map((member) => (
              <div 
                key={member.id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-red-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-red-500 text-lg">
                    -${Math.abs(member.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {membersOwed.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-green-600 font-medium">
            <ArrowUp size={18} />
            <h3 className="text-lg">Reimbursements to Process</h3>
          </div>
          <div className="space-y-3">
            {membersOwed.map((member) => (
              <div 
                key={member.id} 
                className="p-4 border border-gray-200 rounded-lg border-l-4 border-l-green-500 hover:shadow-md transition-shadow duration-200 ease-in-out"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-800">{member.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-green-500 text-lg">
                    +${Math.abs(member.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
          <DollarSign size={18} />
          Process Reimbursements
        </button>
        <button className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
          <CreditCard size={18} />
          Settle All
        </button>
      </div>
    </div>
  );
}

function BalanceSheet({ balanceSheetData, totalBudget, totalSpent, totalReimbursed, totalBalance, onBack }: BalanceSheetProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tennis Club Balance Sheet</h2>
        <button 
          className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium hover:bg-gray-50 flex items-center gap-2"
          onClick={onBack}
        >
          <ChevronUp size={16} />
          Back to Dashboard
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Category</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Budget</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Spent</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Reimbursed</th>
              <th className="py-3 px-4 text-left font-semibold text-gray-700">Balance</th>
            </tr>
          </thead>
          <tbody>
            {balanceSheetData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">${item.budget.toFixed(2)}</td>
                <td className="py-3 px-4">${item.spent.toFixed(2)}</td>
                <td className="py-3 px-4">${item.reimbursed.toFixed(2)}</td>
                <td className="py-3 px-4">${item.balance.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-200 font-semibold bg-gray-50">
              <td className="py-3 px-4">Total</td>
              <td className="py-3 px-4">${totalBudget.toFixed(2)}</td>
              <td className="py-3 px-4">${totalSpent.toFixed(2)}</td>
              <td className="py-3 px-4">${totalReimbursed.toFixed(2)}</td>
              <td className="py-3 px-4">${totalBalance.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PaymentModal({ onClose, categories }: PaymentModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would handle payment submission
    console.log({ selectedCategory, amount, description });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Log Payment</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Category</label>
            <div className="relative">
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 font-medium">Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
              </div>
              <input 
                type="number" 
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Description</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter payment description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 flex items-center gap-2"
            >
              <DollarSign size={16} />
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddGroupModal({ onClose, onAdd }: AddGroupModalProps) {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(groupName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Group</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Group Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddSubgroupModal({ onClose, onAdd, parentGroupName }: AddSubgroupModalProps) {
  const [subgroupName, setSubgroupName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(subgroupName);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Subgroup to {parentGroupName}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Subgroup Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter subgroup name"
              value={subgroupName}
              onChange={(e) => setSubgroupName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button"
              className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Subgroup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

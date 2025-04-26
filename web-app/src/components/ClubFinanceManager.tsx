import React, { useState } from "react";
import { ChevronDown, ChevronUp, DollarSign, CreditCard, ArrowDown, ArrowUp } from "lucide-react";

interface Member {
  id: number;
  name: string;
  transaction: string;
  timeAgo: string;
  amount: number;
}

interface Category {
  id: number;
  name: string;
  amountToReimburse: number;
  percentPaid: number;
  members: Member[];
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

// Main App Component
export default function ClubFinanceManager() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const categories: Category[] = [
    {
      id: 1,
      name: "Spring Retreat",
      amountToReimburse: 1250,
      percentPaid: 75,
      members: [
        { id: 1, name: "Sarah Johnson", transaction: "Lodging fee", timeAgo: "3 days ago", amount: -150 },
        { id: 2, name: "Michael Smith", transaction: "Transportation", timeAgo: "5 days ago", amount: 85 },
        { id: 3, name: "Chris Davis", transaction: "Equipment rental", timeAgo: "2 days ago", amount: -210 },
        { id: 4, name: "Jessica Williams", transaction: "Food and drinks", timeAgo: "4 days ago", amount: -180 },
        { id: 5, name: "Taylor Rogers", transaction: "Activity costs", timeAgo: "1 day ago", amount: 120 }
      ]
    },
    {
      id: 2,
      name: "Tournament Travel",
      amountToReimburse: 2350,
      percentPaid: 45,
      members: [
        { id: 1, name: "David Thompson", transaction: "Hotel booking", timeAgo: "1 week ago", amount: -320 },
        { id: 2, name: "Amanda Lee", transaction: "Flight tickets", timeAgo: "6 days ago", amount: -450 },
        { id: 3, name: "Robert Martin", transaction: "Tournament fees", timeAgo: "3 days ago", amount: 275 },
        { id: 4, name: "Ella Parker", transaction: "Equipment transport", timeAgo: "2 days ago", amount: 130 }
      ]
    },
    {
      id: 3,
      name: "Annual Fundraiser",
      amountToReimburse: 3600,
      percentPaid: 90,
      members: [
        { id: 1, name: "Emma Wilson", transaction: "Venue rental", timeAgo: "2 weeks ago", amount: -950 },
        { id: 2, name: "James Brown", transaction: "Catering services", timeAgo: "10 days ago", amount: -1200 },
        { id: 3, name: "Olivia Jones", transaction: "Decoration", timeAgo: "1 week ago", amount: 300 },
        { id: 4, name: "Daniel Miller", transaction: "Promotional materials", timeAgo: "5 days ago", amount: -420 }
      ]
    },
    {
      id: 4,
      name: "Equipment Purchase",
      amountToReimburse: 850,
      percentPaid: 60,
      members: [
        { id: 1, name: "Ryan Taylor", transaction: "Tennis rackets", timeAgo: "2 weeks ago", amount: -350 },
        { id: 2, name: "Sophia Clark", transaction: "Tennis balls", timeAgo: "1 week ago", amount: -120 },
        { id: 3, name: "Ethan White", transaction: "Court equipment", timeAgo: "3 days ago", amount: 180 }
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
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-semibold text-indigo-600">Club Finance Manager</div>
          <div className="flex items-center gap-2">
            <span>Business Account: Tennis Club</span>
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">A</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {showBalanceSheet ? (
          <BalanceSheet 
            balanceSheetData={balanceSheetData} 
            totalBudget={totalBudget}
            totalSpent={totalSpent}
            totalReimbursed={totalReimbursed}
            totalBalance={totalBalance}
            onBack={() => setShowBalanceSheet(false)} 
          />
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <WelcomeBanner />
              
              <div className="flex gap-4 mb-6">
                <button 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 flex items-center gap-2"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <DollarSign size={16} />
                  Log Payment
                </button>
                <button 
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md font-medium hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => setShowBalanceSheet(true)}
                >
                  <CreditCard size={16} />
                  View Balance Sheet
                </button>
              </div>
              
              <CategoryList 
                categories={categories} 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
            
            <div className="md:w-1/2">
              <DetailPanel 
                activeCategory={activeCategory !== null ? categories[activeCategory] : null} 
              />
            </div>
          </div>
        )}
      </main>

      {showPaymentModal && (
        <PaymentModal onClose={() => setShowPaymentModal(false)} categories={categories} />
      )}
    </div>
  );
}

function WelcomeBanner() {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-1">Tennis Club</h2>
      <p className="text-gray-600">Manage your club's finances and reimbursements</p>
    </div>
  );
}

function CategoryList({ categories, activeCategory, setActiveCategory }: CategoryListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {categories.map((category, index) => (
        <div key={category.id} className="border-b border-gray-200 last:border-b-0">
          <div 
            className={`p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center
              ${activeCategory === index ? "bg-gray-50" : ""}`}
            onClick={() => setActiveCategory(activeCategory === index ? null : index)}
          >
            <div className="flex-1">
              <div className="font-medium mb-1">{category.name}</div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span><span className="font-semibold">${category.amountToReimburse}</span> to reimburse</span>
                <div className="relative flex-1 max-w-[150px] h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="absolute top-0 left-0 h-full bg-indigo-600" 
                    style={{ width: `${category.percentPaid}%` }}
                  ></div>
                </div>
                <span>{category.percentPaid}% paid</span>
              </div>
            </div>
            <div className="text-gray-500">
              {activeCategory === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>

          {activeCategory === index && (
            <CategoryMembers category={category} />
          )}
        </div>
      ))}
    </div>
  );
}

function CategoryMembers({ category }: CategoryMembersProps) {
  // Separate members into those who owe money and those who are owed
  const membersWhoOwe = category.members.filter(member => member.amount < 0);
  const membersOwed = category.members.filter(member => member.amount > 0);

  return (
    <div className="p-4 bg-gray-50">
      {/* Members who owe money section */}
      {membersWhoOwe.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-red-600 font-medium">
            <ArrowDown size={16} />
            <h3>Members Who Owe Money</h3>
          </div>
          <div className="space-y-3">
            {membersWhoOwe.map((member) => (
              <div key={member.id} className="bg-white p-3 rounded shadow-sm flex justify-between items-center border-l-4 border-red-500">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.transaction} • {member.timeAgo}</div>
                </div>
                <div className="font-semibold text-red-500">
                  -${Math.abs(member.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Members who are owed money section */}
      {membersOwed.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-green-600 font-medium">
            <ArrowUp size={16} />
            <h3>Reimbursements to Process</h3>
          </div>
          <div className="space-y-3">
            {membersOwed.map((member) => (
              <div key={member.id} className="bg-white p-3 rounded shadow-sm flex justify-between items-center border-l-4 border-green-500">
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.transaction} • {member.timeAgo}</div>
                </div>
                <div className="font-semibold text-green-500">
                  +${Math.abs(member.amount)}
                </div>
              </div>
            ))}
          </div>
          
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 w-full flex items-center justify-center gap-2">
            <DollarSign size={16} />
            Process All Reimbursements
          </button>
        </div>
      )}
      
      {/* Overall reimbursement button */}
      <button className="px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 w-full flex items-center justify-center gap-2">
        <CreditCard size={16} />
        Settle All Transactions
      </button>
    </div>
  );
}

function DetailPanel({ activeCategory }: DetailPanelProps) {
  if (!activeCategory) {
    return (
      <div className="bg-white rounded-lg shadow p-6 h-full">
        <h3 className="text-lg font-medium mb-2">Select a category to view details</h3>
        <p className="text-gray-600">Click on any category to see member transactions and reimbursement status.</p>
      </div>
    );
  }

  // Separate members into those who owe money and those who are owed
  const membersWhoOwe = activeCategory.members.filter(member => member.amount < 0);
  const membersOwed = activeCategory.members.filter(member => member.amount > 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">{activeCategory.name} Details</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Total to reimburse:</span>
          <span className="font-semibold">${activeCategory.amountToReimburse}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Reimbursement progress:</span>
          <span className="font-semibold">{activeCategory.percentPaid}%</span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-indigo-600" 
            style={{ width: `${activeCategory.percentPaid}%` }}
          ></div>
        </div>
      </div>
      
      {/* Members who owe money section */}
      {membersWhoOwe.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-red-600 font-medium">
            <ArrowDown size={16} />
            <h3>Members Who Owe Money</h3>
          </div>
          <div className="space-y-3">
            {membersWhoOwe.map((member) => (
              <div key={member.id} className="p-3 border border-gray-200 rounded-md border-l-4 border-l-red-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-red-500">
                    -${Math.abs(member.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Members who are owed money section */}
      {membersOwed.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 text-green-600 font-medium">
            <ArrowUp size={16} />
            <h3>Reimbursements to Process</h3>
          </div>
          <div className="space-y-3">
            {membersOwed.map((member) => (
              <div key={member.id} className="p-3 border border-gray-200 rounded-md border-l-4 border-l-green-500">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.transaction} • {member.timeAgo}</div>
                  </div>
                  <div className="font-semibold text-green-500">
                    +${Math.abs(member.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-6 flex gap-3">
        <button className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md font-medium hover:bg-green-600 flex items-center justify-center gap-2">
          <DollarSign size={16} />
          Process Reimbursements
        </button>
        <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 flex items-center justify-center gap-2">
          <CreditCard size={16} />
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

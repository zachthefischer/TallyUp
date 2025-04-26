import { ChevronDown, ChevronUp, DollarSign, CreditCard, ArrowDown, ArrowUp, Plus } from "lucide-react";
import { BalanceSheetItem } from "../types/BalanceSheet";

interface BalanceSheetProps {
    balanceSheetData: BalanceSheetItem[];
    totalBudget: number;
    totalSpent: number;
    totalReimbursed: number;
    totalBalance: number;
    onBack: () => void;
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
                  <td className="py-3 px-4">{item.group}</td>
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

export default BalanceSheet;
import React, { useState } from 'react';
import { DollarSign } from "lucide-react";
import { UserGroup } from '../types/User';

interface PaymentModalProps {
    group: UserGroup | null;
    onAdd: (userId: string, amount: number, description: string) => void;
    onClose: () => void;
  }
    
function PaymentModal({ 
  group,
  onAdd,
  onClose,
}: PaymentModalProps) {
    const ZACH_USER_ID = "680e10f496794424d85bb535"
    const [amount, setAmount] = useState(1.25);
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(ZACH_USER_ID);
    console.log("MODAL GROUP", group)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Here you would handle payment submission

      onAdd(userId, amount, description);
      console.log({amount, description });
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold  text-black">Log Payment for {group?.groupName}</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Amount</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <input 
                  type="number" 
                  step="0.01"
                  className="w-full pl-8 pr-3 text-black py-2 border border-gray-300 rounded-md"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  required
                />
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Description</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md"
                placeholder="Enter payment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Request Payment From:</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-md"
                placeholder="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            
            <div className="flex justify-end gap-3">
              <button 
                type="button"
                className="px-4 py-2 bg-white border text-gray-700 border-gray-300 rounded-md font-medium hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-[#396e7c] rounded-md font-medium hover:bg-[#396e7c]/90 flex items-center gap-2"
              >
                <DollarSign size={18} />
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
export default PaymentModal;  
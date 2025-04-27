import React, { useState } from 'react';
import { ChevronDown, DollarSign } from "lucide-react";
import { Group } from '../types/Group';

interface PaymentModalProps {
    onClose: () => void;
    groups: Group[];
  }
    
function PaymentModal({ onClose, groups }: PaymentModalProps) {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Here you would handle payment submission
      console.log({ selectedGroup, amount, description });
      onClose();
    };
  
    return (
      <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
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
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  required
                >
                  <option value="">Select a group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
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
                className="px-4 py-2 bg-white text-[#082341] border border-gray-300 rounded-md font-medium hover:bg-gray-50"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-[#396e7c] text-white rounded-md font-medium hover:bg-[#396e7c]/90 flex items-center gap-2"
              >
                <DollarSign size={18} />
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
export default PaymentModal;  
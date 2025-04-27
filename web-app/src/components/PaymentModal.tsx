import React, { useState } from 'react';
import { ChevronDown, DollarSign } from "lucide-react";
import { Group } from '../types/Group';
import './Modal.css';
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
    const [amount, setAmount] = useState(null as unknown as number);
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
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">Log Payment for {group?.groupName}</h3>
            <button 
              onClick={onClose}
              className="modal-close-button"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* <div className="modal-form-group">
              <label className="modal-label">Category</label>
              <div className="modal-select-container">
                <select 
                  className="modal-select"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
            <div className="modal-form-group">
              <label className="modal-label">Amount</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01"
                  min="0"
                  className="modal-input-with-icon"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  required
                />
                <span className="modal-input-icon">$</span>
              </div>
            </div>
            
            <div className="modal-form-group">
              <label className="modal-label">Description</label>
              <input 
                type="text" 
                className="modal-input"
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

            
            <div className="modal-actions">
              <button 
                type="button"
                className="modal-button modal-button-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="modal-button modal-button-navy"
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
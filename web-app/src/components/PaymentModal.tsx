import React, { useState } from 'react';
import { ChevronDown, DollarSign } from "lucide-react";
import { Group } from '../types/Group';
import './Modal.css';

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
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">Log Payment</h3>
            <button 
              onClick={onClose}
              className="modal-close-button"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-form-group">
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
            </div>
            
            <div className="modal-form-group">
              <label className="modal-label">Amount</label>
              <div className="modal-select-container">
                <div className="modal-input-icon">
                  <span>$</span>
                </div>
                <input 
                  type="number" 
                  className="modal-input-with-icon"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
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
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
export default PaymentModal;  
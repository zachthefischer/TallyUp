import React, { useState } from "react";
import { Plus } from "lucide-react";
import './Modal.css';

interface AddUserModalProps {
    onClose: () => void;
    onAdd: (firstName: string, lastName: string) => void;
  }  

function AddUserModal({ onClose, onAdd }: AddUserModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(firstName, lastName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Add New User</h3>
          <button 
            onClick={onClose}
            className="modal-close-button"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <label className="modal-label">First Name</label>
            <input 
              type="text" 
              className="modal-input"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="modal-form-group">
            <label className="modal-label">Last Name</label>
            <input 
              type="text" 
              className="modal-input"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              <Plus size={16} />
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
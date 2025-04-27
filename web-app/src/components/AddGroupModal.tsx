import React, { useState } from "react";
import { Plus } from "lucide-react";
import './Modal.css';

interface AddGroupModalProps {
    onClose: () => void;
    onAdd: (groupName: string) => void;
  }  

function AddGroupModal({ onClose, onAdd }: AddGroupModalProps) {
  const [groupName, setGroupName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(groupName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Add New Group</h3>
          <button 
            onClick={onClose}
            className="modal-close-button"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-form-group">
            <input 
              type="text" 
              className="modal-input"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
              Add Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddGroupModal;
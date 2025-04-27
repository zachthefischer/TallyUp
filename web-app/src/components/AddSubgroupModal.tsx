import React, { useState } from "react";
import { Plus } from "lucide-react";
import './Modal.css';

interface AddSubgroupModalProps {
  onClose: () => void;
  onAdd: (subgroupName: string) => void;
  parentGroupName: string;
}

function AddSubgroupModal({ onClose, onAdd, parentGroupName }: AddSubgroupModalProps) {
  const [subgroupName, setSubgroupName] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(subgroupName);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Add New Subgroup to {parentGroupName}</h3>
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
              placeholder="Enter subgroup name"
              value={subgroupName}
              onChange={(e) => setSubgroupName(e.target.value)}
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
              className="modal-button modal-button-teal"
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
export default AddSubgroupModal;
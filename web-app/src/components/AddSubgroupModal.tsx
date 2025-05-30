import React, { useState } from "react";
import { Plus } from "lucide-react";
import { UserGroup } from "../types/User";
import './Modal.css';

interface AddSubgroupModalProps {
  onClose: () => void;
  onAdd: (groupId ?: string, subgroupName ?: string, subGroupId ?: string) => void;
  modalType: number;
  group: UserGroup | null;
  subGroup : UserGroup | null;
}

function AddSubgroupModal({ 
  onClose, 
  onAdd,
  modalType,
  group,
  subGroup,
}: AddSubgroupModalProps) {
  const [subgroupName, setSubgroupName] = useState("");

  console.log("AddSubgroupModal", group);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(group?.groupId, subgroupName, subGroup?.groupId);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Add New {modalType === 1 ? 'Event' : 'Subgroup'} to {group?.groupName}</h3>
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
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSubgroupModal;
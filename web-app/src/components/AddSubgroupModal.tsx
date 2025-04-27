import React, { useState } from "react";
import { Plus } from "lucide-react";
import { UserGroup } from "../types/User";

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
    <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add new {modalType === 1 ? 'group' : 'subgroup'} to {group?.groupName}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Subgroup Name</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter subgroup name"
              value={subgroupName}
              onChange={(e) => setSubgroupName(e.target.value)}
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
              className="px-4 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add SubGroup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSubgroupModal;
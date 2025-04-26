import React, { useState } from "react";
import { Plus } from "lucide-react";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New Subgroup to {parentGroupName}</h3>
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
              Add Subgroup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSubgroupModal;
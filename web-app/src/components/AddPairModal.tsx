import React, { useState } from 'react';
import { Plus } from "lucide-react";
import { UserGroup } from '../types/User';

interface AddPairModalProps {
    group: UserGroup | null;
    onAdd: (userId: string) => void;
    onClose: () => void;
  }
    
function AddPairModal({ 
  group,
  onAdd,
  onClose,
}: AddPairModalProps) {
    const ZACH_USER_ID = "680e1ba6a3b6cd1dffc43805"
    const [amount, setAmount] = useState(1.25);
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(ZACH_USER_ID);

    console.log("MODAL GROUP", group)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Here you would handle payment submission

      onAdd(userId);
      console.log({amount, description });
      onClose();
    };
  
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">Add User to {group?.groupName}</h3>
            <button 
              onClick={onClose}
              className="modal-close-button"
            >
              ✕
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Member</label>
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
                className="px-4 py-2 bg-[#396e7c] text-white rounded-md font-medium hover:bg-[#396e7c]/90 flex items-center gap-2"
              >
                <Plus size={18} />
                Add a New User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
export default AddPairModal;  
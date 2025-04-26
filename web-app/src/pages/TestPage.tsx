import { useState, useEffect } from 'react';
import { fetchUserGroups } from "../services/apiService";
import { User } from "../types/User";
import './Dashboard.css'

const TestPage = () => {
  const [state, setState] = useState(1); // Initial state is 1

  const handleBox1Click = () => {
    setState(2); // Transition to state 2
  };

  const handleBox2Click = () => {
    setState(3); // Transition to state 3
  };

  const handleBack = () => {
    setState(Math.max(state - 1, 1)); // Transition to state 3
  };

  const [groups, setGroups] = useState<User[]>([]);

  useEffect(() => {
    const loadGroups = async () => {
      try {
        const data = await fetchUserGroups();
        console.log("Fetched groups:", data);
        setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups", error);
      }
    };

    loadGroups();
  }, []);


  return (
    <div className="container">
      {/* Box 1 */}
      <div
        className={`box 
            ${state === 1 ? 'center' : ''}
            ${state === 2 ? 'box-left' : ''}
            ${state === 3 ? 'offscreen-left' : ''} 
        `}
      >
        <button className="btn bg-green-600" onClick={handleBack}>Back</button>
        <button className="btn bg-yellow-300" onClick={handleBox1Click}>Box 1</button>

        <h1>Your Groups</h1>
      <ul>
        {groups.map(group => (
          <li key={group._id}>{group.firstName}</li>
        ))}
      </ul>

      </div>

      {/* Box 2 */}
      <div
        className={`box 
            ${state === 1 ? 'offscreen-right' : ''}
            ${state === 2 ? 'box-right' : ''}
            ${state === 3 ? 'box-left' : ''} 
        `}
      >
        <button className="btn bg-green-600"  onClick={handleBack}>Back</button>
        <button className="btn bg-yellow-300"  onClick={handleBox2Click}>Box 2</button>
      </div>

      {/* Box 3 */}
      <div
        className={`box 
            ${state === 1 ? 'offscreen-right' : ''}
            ${state === 2 ? 'offscreen-right' : ''}
            ${state === 3 ? 'box-right' : ''} 
        `}
      >
                <button className="btn bg-green-600"  onClick={handleBack}>Back</button>
                <button className="btn bg-yellow-300" >Box 3</button>

      </div>
    </div>
  );
};

export default TestPage;


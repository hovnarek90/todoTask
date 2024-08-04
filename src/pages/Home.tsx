import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-4">
      <button
        onClick={() => setIsFormOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Add Task
      </button>
      {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}
      <TaskList />
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsFormOpen(true)}>Add Task</button>
      {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}
      <TaskList />
    </div>
  );
};

export default Home;

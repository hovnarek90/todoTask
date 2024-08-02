import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import TaskItem from "../components/TaskItem";

const Trash: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div>
      <h2 className="text-2xl mb-4">Trash</h2>
      <div>
        {tasks
          .filter((task) => task.status === "Removed")
          .map((task) => (
            <TaskItem key={task.id} task={task} onEdit={() => {}} />
          ))}
      </div>
    </div>
  );
};

export default Trash;

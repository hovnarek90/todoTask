import React from "react";
import { useDispatch } from "react-redux";
import { Task } from "../store/features/tasks/tasksSlice";
import {
  completeTaskInFirestore,
  moveTaskToTrash, // Import the new thunk
} from "../store/features/tasks/tasksThunks";
import { AppDispatch } from "../store/store";

interface TaskActionsProps {
  task: Task;
  onEdit: () => void;
  onRemove: () => void;
  onComplete: () => void;
}

const TaskActions: React.FC<TaskActionsProps> = ({
  task,
  onEdit,
  onRemove,
  onComplete,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleComplete = () => {
    dispatch(completeTaskInFirestore(task.id));
    onComplete();
  };

  const handleRemove = () => {
    
    dispatch(moveTaskToTrash(task)); // Move the task to the trash
    onRemove();
  };

  return (
    <div className="flex space-x-2">
      {task.status === "Pending" && (
        <button
          onClick={handleComplete}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Complete
        </button>
      )}
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Edit
      </button>
      <button
        onClick={handleRemove}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default TaskActions;

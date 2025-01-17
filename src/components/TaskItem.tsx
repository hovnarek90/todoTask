import React from "react";
import { useDispatch } from "react-redux";
import { completeTask, removeTask } from "../store/features/tasks/tasksSlice";
import { Task } from "../store/features/tasks/tasksSlice";

interface TaskItemProps {
  task: Task;
  onEdit?: () => void;
  onRemove: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onRemove }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className="text-sm text-gray-500">Status: {task.status}</p>
      <div className="flex space-x-4 mt-2">
        {task.status === "Pending" && (
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            Edit
          </button>
        )}
        {task.status === "Pending" && (
          <button
            onClick={() => dispatch(completeTask(task.id))}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => {
            dispatch(removeTask(task.id));
            onRemove();
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

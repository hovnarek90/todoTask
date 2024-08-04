import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "./TaskItem";
import { Task, removeTask } from "../store/features/tasks/tasksSlice";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId));
  };

  return (
    <div className="p-4">
      {editingTask && (
        <TaskForm task={editingTask} onClose={() => setEditingTask(null)} />
      )}
      {tasks
        ?.filter((task) => task.status !== "Removed")
        .map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={() => handleEditTask(task)}
            onRemove={() => handleRemoveTask(task.id)}
          />
        ))}
    </div>
  );
};

export default TaskList;

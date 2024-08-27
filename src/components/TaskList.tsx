import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import TaskItem from "./TaskItem";
import { Task, removeTask } from "../store/features/tasks/tasksSlice";
import TaskForm from "./TaskForm";
import { fetchAllTasks } from "../store/features/tasks/tasksThunks";
import { deleteTaskFromFirestore } from "../store/features/tasks/tasksThunks";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchAllTasks();
      setTasks(fetchedTasks as Task[]);
    };

    loadTasks();
  }, []);
  // const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch: AppDispatch = useDispatch();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleRemoveTask = (taskId: string) => {
    dispatch(deleteTaskFromFirestore(taskId));
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

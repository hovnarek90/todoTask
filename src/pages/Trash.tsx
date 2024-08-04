import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import TaskItem from "../components/TaskItem";
import { deleteTask } from "../store/features/tasks/tasksSlice";
const Trash: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      <h2 className="text-2xl mb-4">Trash</h2>
      <div>
        {tasks
          ?.filter((task) => task.status === "Removed")
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={() => handleRemove(task.id)} // Pass onRemove prop
            />
          ))}
      </div>
    </div>
  );
};

export default Trash;

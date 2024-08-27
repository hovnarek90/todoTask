import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { completeTaskInFirestore } from "./tasksThunks";

export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline?: Date | string;
  status: "Pending" | "Completed" | "Overdue" | "Removed";
}

export interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    completeTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task && task.status !== "Overdue") {
        task.status = "Completed";
      }
    },
    removeTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.status = "Removed";
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    removeTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.status !== "Removed");
    },
    checkOverdueTasks: (state) => {
      const currentDate = new Date().toISOString().split("T")[0];
      state.tasks.forEach((task) => {
        if (
          task.deadline &&
          task.deadline < currentDate &&
          task.status === "Pending"
        ) {
          task.status = "Overdue";
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(completeTaskInFirestore.fulfilled, (state, action) => {
      // Find the task in the state and update its status to "Completed"
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = "Completed";
      }
    });
  },
});

export const {
  addTask,
  editTask,
  completeTask,
  removeTask,
  deleteTask,
  checkOverdueTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;

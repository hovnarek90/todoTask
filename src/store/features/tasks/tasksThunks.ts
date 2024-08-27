// tasksThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTask,
  editTask,
  deleteTask,
  Task,
  completeTask,
  removeTask,
} from "./tasksSlice";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";

import { db } from "../../../firebaseConfig"; // Import the initialized Firestore instance
export const addTaskToFirestore = createAsyncThunk(
  "tasks/addTaskToFirestore",
  async (task: Task, { dispatch }) => {
    try {
      const taskData = {
        title: task.title,
        description: task.description,
        deadline:
          task.deadline instanceof Date
            ? task.deadline.toISOString()
            : task.deadline,
        status: task.status,
      };

      const docRef = await addDoc(collection(db, "tasks"), taskData);
      const newTask = { ...task, id: docRef.id }; // Assign Firestore-generated id to the task
      dispatch(addTask(newTask)); // Save task with the Firestore id
      console.log("Task added to Firestore");
    } catch (error) {
      console.error("Error adding task to Firestore: ", error);
    }
  }
);

import { getDoc } from "firebase/firestore";

export const editTaskInFirestore = createAsyncThunk(
  "tasks/editTaskInFirestore",
  async (task: Task, { dispatch }) => {
    try {
      const taskRef = doc(db, "tasks", task.id); // Use the task's id to reference the document
      const docSnap = await getDoc(taskRef);

      if (!docSnap.exists()) {
        console.error(`No document found with ID ${task.id}`);
        return; // Exit if the document doesn't exist
      }

      const taskData = {
        title: task.title,
        description: task.description,
        deadline:
          task.deadline instanceof Date
            ? task.deadline.toISOString()
            : task.deadline,
        status: task.status,
      };

      await updateDoc(taskRef, taskData); // Update the Firestore document
      dispatch(editTask(task)); // Update the Redux store
      console.log("Task successfully updated in Firestore.");
    } catch (error) {
      console.error("Error editing task in Firestore: ", error);
    }
  }
);

export const deleteTaskFromFirestore = createAsyncThunk(
  "tasks/deleteTaskFromFirestore",
  async (taskId: string, { dispatch }) => {
    try {
      // Verify taskId before proceeding
      if (!taskId) {
        console.error("Task ID is undefined or null.");
        return;
      }

      console.log(`Attempting to delete task with ID: ${taskId}`);
      const taskRef = doc(db, "tasks", taskId); // Reference the correct document

      await deleteDoc(taskRef); // Delete the document from Firestore
      dispatch(deleteTask(taskId)); // Update Redux store
      console.log("Task successfully deleted from Firestore.");
    } catch (error) {
      console.error("Error deleting task from Firestore: ", error);
    }
  }
);

export const removeTaskFromFirestore = createAsyncThunk(
  "tasks/removeTaskFromFirestore",
  async (taskId: string, { dispatch }) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef); // Delete from Firestore
      dispatch(removeTask(taskId)); // Update Redux store
    } catch (error) {
      console.error("Error removing task from Firestore: ", error);
    }
  }
);

export const moveTaskToTrash = createAsyncThunk(
  "tasks/moveTaskToTrash",
  async (task: Task, { dispatch }) => {
    try {
      // Reference to the "tasks" collection
      const taskRef = doc(db, "tasks", task.id);

      // Reference to the "trash" collection
      const trashRef = doc(db, "trash", task.id);

      // Add the task to the "trash" collection
      await setDoc(trashRef, task);

      // Delete the task from the "tasks" collection
      await deleteDoc(taskRef);

      // Update the Redux store (if necessary, e.g., remove the task from the UI)
      dispatch(deleteTask(task.id));

      console.log("Task moved to trash and removed from tasks collection.");
    } catch (error) {
      console.error("Error moving task to trash: ", error);
    }
  }
);

export const fetchTrashedTasks = async () => {
  try {
    // Reference to the "trash" collection
    const trashCollectionRef = collection(db, "trash");

    // Fetch all documents from the "trash" collection
    const querySnapshot = await getDocs(trashCollectionRef);

    // Map through the documents and extract data
    const trashedTasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Trashed Tasks:", trashedTasks);
    return trashedTasks;
  } catch (error) {
    console.error("Error fetching trashed tasks: ", error);
    return [];
  }
};
export const fetchTasks = async () => {
  try {
    // Reference to the "tasks" collection
    const tasksCollectionRef = collection(db, "tasks");

    // Fetch all documents from the "tasks" collection
    const querySnapshot = await getDocs(tasksCollectionRef);

    // Map through the documents and extract data
    const tasks = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Tasks:", tasks);
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return [];
  }
};

export const fetchAllTasks = async () => {
  try {
    // Fetch tasks from the "tasks" collection
    const tasks = await fetchTasks();

    // Fetch tasks from the "trash" collection
    const trashedTasks = await fetchTrashedTasks();

    // Combine the two arrays
    const allTasks = [...tasks, ...trashedTasks];

    console.log("All Tasks:", allTasks);
    return allTasks;
  } catch (error) {
    console.error("Error fetching all tasks: ", error);
    return [];
  }
};

export const completeTaskInFirestore = createAsyncThunk(
  "tasks/completeTaskInFirestore",
  async (taskId: string, { rejectWithValue }) => {
    try {
      // Reference to the specific task document in Firestore
      const taskDocRef = doc(db, "tasks", taskId);

      // Update the task's status to "Completed"
      await updateDoc(taskDocRef, { status: "Completed" });

      return taskId; // Return the taskId to be handled by the reducer
    } catch (error) {
      console.error("Error completing task in Firestore: ", error);
    }
  }
);

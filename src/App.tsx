import React, { useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import { useDispatch } from "react-redux";
import { checkOverdueTasks } from "./store/features/tasks/tasksSlice";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkOverdueTasks());
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<NavBar />}>
        <Route path="/" element={<Home />} />
        <Route path="/trash" element={<Trash />} />
        <Route />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

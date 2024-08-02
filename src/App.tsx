import React, { useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Trash from "./pages/Trash";
import { useDispatch } from "react-redux";
import { checkOverdueTasks } from "./features/tasks/tasksSlice";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkOverdueTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-white">
            Home
          </Link>
          <Link to="/trash" className="text-white">
            Trash
          </Link>
        </div>
      </nav>
      <div className="container mx-auto py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

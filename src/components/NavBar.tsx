import React from "react";
import { Link, Outlet } from "react-router-dom";

const ComponentName: React.FC = () => {
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
        <Outlet />
      </div>
    </div>
  );
};

export default ComponentName;

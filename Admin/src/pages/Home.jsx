import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Welcome Message */}
      <div className="bg-indigo-100 text-indigo-800 p-6 rounded-xl mb-10 shadow max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Welcome back, Admin!</h2>
        <p>Here’s a quick overview. Use the buttons below to manage products and orders efficiently.</p>
      </div>

      {/* Action Buttons */}
      <div className="grid gap-6 sm:grid-cols-3 mb-12 w-full max-w-4xl">
        <Link to="/add" className="flex flex-col items-center justify-center p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105">
          <Plus size={36} />
          <span className="mt-2 text-lg font-semibold">Add</span>
        </Link>

        <Link to="/list" className="flex flex-col items-center justify-center p-6 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105">
          <List size={36} />
          <span className="mt-2 text-lg font-semibold">List</span>
        </Link>

        <Link to="/orders" className="flex flex-col items-center justify-center p-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105">
          <ClipboardList size={36} />
          <span className="mt-2 text-lg font-semibold">Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;

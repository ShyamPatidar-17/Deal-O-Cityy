import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10 flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Admin Dashboard</h1>

      {/* Welcome Message */}
      <div className="bg-indigo-100 text-indigo-800 p-6 rounded-xl mb-10 shadow max-w-xl">
        <h2 className="text-2xl font-semibold mb-2">Welcome back, Admin!</h2>
        <p>Here’s a quick overview. Use the buttons below to manage products efficiently.</p>
      </div>

      {/* Action Buttons in one row */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
        <Link
          to="/add"
          className="flex items-center justify-center px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105 text-xl font-bold"
        >
          Add Product
        </Link>

        <Link
          to="/list"
          className="flex items-center justify-center px-8 py-6 bg-green-600 hover:bg-green-700 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105 text-xl font-bold"
        >
          Product List
        </Link>

        <Link
          to="/orders"
          className="flex items-center justify-center px-8 py-6 bg-yellow-500 hover:bg-yellow-600 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105 text-xl font-bold"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
};

export default Home;

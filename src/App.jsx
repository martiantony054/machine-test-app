import { Route, Routes,Link } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Register from "./Components/Register";
import Login from "./Components/Login";
import UserList from "./Components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const saveUsers = (newUsers) => {
    localStorage.setItem("users", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  return (
    <div className="App flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 p-8">
    <div className="flex items-center justify-between w-full max-w-4xl mb-12">
      <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
        User Management System
      </h1>
      <div className="flex gap-4">
        <Link to="/register">
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </Link>
        <Link to="/user-list">
          <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200">
            User List
          </button>
        </Link>
      </div>
    </div>
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-lg p-6">
      <Routes>
        <Route
          path="/register"
          element={<Register saveUsers={saveUsers} />}
        />
        <Route path="/login" element={<Login users={users} />} />
        <Route
          path="/user-list"
          element={<UserList users={users} saveUsers={saveUsers} />}
        />
        <Route path="/" element={<Login users={users} />} />
      </Routes>
    </div>
  </div>
  );
}

export default App;

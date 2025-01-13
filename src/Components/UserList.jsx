import React, { useState, useEffect } from "react";
import { Card, List, Typography } from "@material-tailwind/react";
import User from "./User"; // Import the User component

function UserList() {
  const [users, setUsers] = useState([]);

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  // Save updated users to localStorage
  const saveUsers = (updatedUsers) => {
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
        <Typography variant="h5" color="blue-gray" className="mb-6 text-center text-2xl font-bold text-indigo-800">
          User List
        </Typography>
        <List className="space-y-4">
          {users.length === 0 ? (
            <Typography color="gray" className="text-center py-4 text-lg text-gray-500">
              No users available
            </Typography>
          ) : (
            users.map((user, index) => (
              <User
                key={index}
                user={user}
                users={users}
                saveUsers={saveUsers}
              />
            ))
          )}
        </List>
      </Card>
    </div>
  );
}

export default UserList;
